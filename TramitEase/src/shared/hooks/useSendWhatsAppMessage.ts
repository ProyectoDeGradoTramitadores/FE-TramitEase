import {useState } from 'react';
import { Message } from '../../entities/Message';
import { SendMessageResponse } from '../../entities/SendMessageResponse';
import { sendWhatsAppMessage } from '../services/twilio/TwilioService';
import { ClientFolder } from '../../entities/ClientFolder.ts';
import { useProcedureFolderClients } from './useProcedureFolderClient.ts';
import { useNotificationSettings } from './useNotificationSettings.ts';
import { useProcedures } from './useProcedures.ts';
import { useTramitadores } from './useTramitadores.ts';
import { IDS } from '../constants/routes.ts';
import { useTramits } from './useTramits.ts';

export const useSendWhatsAppMessage = (clientFolders: ClientFolder[]) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [response, setResponse] = useState<SendMessageResponse | null>(null);
    const {fetchProcedureFolderClientsByClientFolderId} = useProcedureFolderClients();
    const {fetchProcedureById} = useProcedures();
    const {fetchTramitById} = useTramits();
    const {fetchTramitadorById} = useTramitadores();

    const idTramitador = IDS().TRAMITADOR_ID;

    const {
        daysBeforeDue,
        whatsAppNotifications,
        notifyOnExpiry,
    } = useNotificationSettings();

    const daysDifference = (startDate: Date, endDate: Date) => {
        const diffInMs = endDate.getTime() - startDate.getTime();
        return Math.ceil(diffInMs / (1000 * 60 * 60 * 24));
    };

    const addDaysToDate = (date: Date, days: number): Date => {
        const resultDate = new Date(date);
        resultDate.setDate(resultDate.getDate() + days);
        return resultDate;
    };

    const checkAndSendNotifications = async () => {
        const lastRunDate = localStorage.getItem('lastRunDate');
        const today = new Date().toISOString().split('T')[0];

        if (lastRunDate !== today) {
            localStorage.removeItem('lastRunDate');
        }

        if (lastRunDate === today) {
            console.log('La notificación ya fue enviada hoy.');
            return;
        }

        if (!whatsAppNotifications || !notifyOnExpiry || !daysBeforeDue) return;

        setLoading(true);
        setError(null);
        setResponse(null);

        const todayDate = new Date();

        const tramitador = await fetchTramitadorById(Number(idTramitador));
        try {
            await Promise.all(clientFolders.map(async folder => {
                if (folder.creationDate && !folder.endDate) {
                    const tramitClient = await fetchTramitById(folder.idTramit);
                    const procedures = await fetchProcedureFolderClientsByClientFolderId(folder.idClientFolder ?? 0);
                    const dateEstimate = addDaysToDate(new Date(folder.creationDate), tramitClient?.dayDuring ?? 0);
                    const daysEstimate = todayDate >= new Date(dateEstimate) ? daysDifference(new Date(dateEstimate), todayDate) :
                        daysDifference(todayDate, new Date(dateEstimate));

                    await Promise.all(procedures?.map(async proc => {
                        if (!proc.isComplete && proc.startDate) {
                            const procTramit = await fetchProcedureById(proc.idProcedure);
                            const dateEstimateProc = addDaysToDate(new Date(proc.startDate), procTramit?.dayDuring ?? 0);
                            const daysUntilDue = todayDate >= new Date(dateEstimateProc)
                                ? daysDifference(new Date(dateEstimateProc), todayDate)
                                : daysDifference(todayDate, new Date(dateEstimateProc));

                            if (todayDate <= new Date(dateEstimate) && daysEstimate <= daysBeforeDue && whatsAppNotifications) {
                                const message: Message = {
                                    to: tramitador?.phoneNumber?.replace(/\s+/g, '') ?? '',
                                    message: `Estimado cliente, su carpeta de cliente ${folder.name} vencerá en ${daysEstimate} días. ` +
                                        `En el procedimiento: ${procTramit?.name ?? ''} con días de vencimiento de ${daysUntilDue} días. ` +
                                        `Por favor, tome las acciones necesarias.`
                                };
                                const result = await sendWhatsAppMessage(message);
                                setResponse(result);
                            } else if (todayDate > new Date(dateEstimate) && notifyOnExpiry) {
                                const message: Message = {
                                    to: tramitador?.phoneNumber?.replace(/\s+/g, '') ?? '',
                                    message: `Estimado cliente, su carpeta de cliente ${folder.name} venció hace ${daysEstimate} días. ` +
                                        `En el procedimiento: ${procTramit?.name ?? ''} con vencimiento de ${daysUntilDue} días. ` +
                                        `Por favor, tome las acciones necesarias.`
                                };
                                const result = await sendWhatsAppMessage(message);
                                setResponse(result);
                            }
                        }
                    }) ?? []);
                }
            }));
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError('An unknown error occurred');
            }
        } finally {
            setLoading(false);
            localStorage.setItem('lastRunDate', today);
        }
    };

    return { sendMessage: checkAndSendNotifications, loading, error, response };
};
