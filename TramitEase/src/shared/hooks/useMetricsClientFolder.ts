import { useEffect, useState } from 'react';
import { useProcedureFolderClients } from './useProcedureFolderClient.ts';
import { useClientFolders } from './useClientFolders.ts';
import { IDS } from '../constants/routes.ts';
import { ClientFolder } from '../../entities/ClientFolder.ts';
import {
    DatasetProps,
    MetricsProcedureProps,
    MetricsClientFolder, stepTableProps,
} from '../types/MetricsClientFolderProps.ts';
import { useProcedures } from './useProcedures.ts';
import { Procedure } from '../../entities/Procedure.ts';
import { useStepProcedureFolderClients } from './useStepProcedureFolderClients.ts';
import { useStepProcedures } from './useStepProcedures.ts';
import { StepProcedureFolderClient } from '../../entities/StepProcedureFolderClient.ts';

export const useMetricsClientFolder = () => {
    const [clientFolder, setClientFolder] = useState<ClientFolder>();
    const [metricsProcedures, setMetricsProcedures] = useState<MetricsProcedureProps[]>([]);
    const [datesRange, setDatesRange] = useState<string[]>([]);
    const [dataSet, setDataSet] = useState<DatasetProps[]>();

    const [metricsClientFolder, setMetricsClientFolder] = useState<MetricsClientFolder>({
        dateLastProcedure: null,
        sizeProcedures: 0,
        numberPercentComplete: 0,
        initialProcedure: null,
        endActuallyProcedure: null,
        completeTramit: false,
        delayTramit: false,
        daysDelay: 0,
        daysOnTime: 0,
    });
    const { fetchProcedureFolderClientsByClientFolderId } = useProcedureFolderClients();
    const { fetchProcedureById } = useProcedures();
    const { fetchStepProcedureFolderClientsByProcedureFolderClientId } = useStepProcedureFolderClients();
    const { fetchStepProcedureById } = useStepProcedures();

    const { fetchClientFolderById } = useClientFolders();
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const idClientFolder = IDS().CLIENT_FOLDER_ID

    const handleError = (err: unknown) => {
        if (err instanceof Error) {
            setError(err.message);
        } else {
            setError('An unknown error occurred');
        }
        setLoading(false);
    };

    useEffect(() => {
        const fetchMetrics = async () => {
            try {
                await fetchMetricsProcedure(Number(idClientFolder));
            } catch (err) {
                handleError(err);
            } finally {
                setLoading(false);
            }
        };
        fetchMetrics();
    }, [metricsClientFolder.sizeProcedures, dataSet]);

    const fetchMetricsProcedure = async (idClientFolder: number) => {
        const clientF = fetchClientFolderById(Number(idClientFolder));
        setClientFolder(await clientF);
        const obtainProcedure = await fetchProcedureFolderClientsByClientFolderId(idClientFolder);

        if (obtainProcedure) {
            setMetricsClientFolder(prevState => ({
                ...prevState,
                sizeProcedures: obtainProcedure.length,
            }));

            let firstValue: Date | null | undefined = new Date;
            let secondValue: Date | null = null;
            let proceduresComplete = 0;

            for (const procedure of obtainProcedure) {
                const index = obtainProcedure.indexOf(procedure);
                const proc : Procedure | undefined = await fetchProcedureById(procedure.idProcedure);
                const stepsClientFolder = await fetchStepProcedureFolderClientsByProcedureFolderClientId(procedure.idProcedureFolderClient)

                const newMetricProcedure : MetricsProcedureProps = {
                    nameProcedure: proc?.name ?? '',
                    steps: await createStepsTable(stepsClientFolder ?? []),
                }

                setMetricsProcedures((prev) => [...prev, newMetricProcedure]);

                if(index === 0){
                    firstValue = procedure.startDate;
                }

                if(procedure.endDate != null){
                    secondValue = procedure.endDate;
                    proceduresComplete += 1;

                    const secondDate = new Date(secondValue);
                    if (clientFolder?.endDate) {
                        const endDate = new Date(clientFolder.endDate);

                        if(endDate < secondDate){
                            const differenceInDays = obtainDays(secondDate, endDate);
                            setMetricsClientFolder(prevState => ({
                                ...prevState,
                                daysDelay: differenceInDays,
                                delayTramit: true,
                            }));
                        }else if(endDate > secondDate){
                            const differenceInDays = obtainDays(secondDate, endDate);
                            setMetricsClientFolder(prevState => ({
                                ...prevState,
                                daysOnTime: differenceInDays,
                            }));
                        }
                    }
                }

                if(index === obtainProcedure.length - 1 && procedure.endDate != null){
                    setMetricsClientFolder(prevState => ({
                        ...prevState,
                        dateLastProcedure: procedure?.endDate ?? new Date(),
                    }));

                    if(procedure.isComplete){
                        setMetricsClientFolder(prevState => ({
                            ...prevState,
                            completeTramit: true,
                        }));
                    }
                }
            }

            setMetricsClientFolder(prevState => ({
                ...prevState,
                numberPercentComplete: (proceduresComplete * 100)  / obtainProcedure.length ,
            }));

            setMetricsClientFolder(prevState => ({
                ...prevState,
                initialProcedure: firstValue?? new Date,
                endActuallyProcedure: secondValue,
            }));

        }

        if (metricsClientFolder?.initialProcedure != null) {
            if (metricsClientFolder.dateLastProcedure && metricsClientFolder.endActuallyProcedure ) {
                if(clientFolder?.endDate  && new Date(clientFolder?.endDate) >
                    new Date(metricsClientFolder.dateLastProcedure) && new Date(clientFolder?.endDate) >
                    new Date(metricsClientFolder.endActuallyProcedure)){
                    generateDateRange(metricsClientFolder.initialProcedure, new Date(clientFolder?.endDate));

                } else if (metricsClientFolder.dateLastProcedure > metricsClientFolder.endActuallyProcedure) {
                    generateDateRange(metricsClientFolder.initialProcedure, metricsClientFolder.dateLastProcedure);

                } else {
                    generateDateRange(metricsClientFolder.initialProcedure, metricsClientFolder.endActuallyProcedure);
                }
            } else if (metricsClientFolder.dateLastProcedure != null) {

                generateDateRange(metricsClientFolder.initialProcedure, metricsClientFolder.dateLastProcedure);
            } else if (metricsClientFolder.endActuallyProcedure != null) {

                generateDateRange(metricsClientFolder.initialProcedure, metricsClientFolder.endActuallyProcedure);
            }
        }
        dataGrafics();
    };

    const calculateEndDate = (startDate: string, daysToAdd: number): Date => {
        const start = new Date(startDate);
        start.setDate(start.getDate() + daysToAdd);
        return start;
    };

    const createStepsTable = async (steps: StepProcedureFolderClient[]): Promise<stepTableProps[]> => {
        const newMetricStep : stepTableProps[] = []

        for (const step of steps) {
            const stepPro = await fetchStepProcedureById(step.idStepProcedure);
            const estimatedDay = calculateEndDate(step?.startDate?.toString() ?? '',
                stepPro?.dayDuring ?? 0);

            const newStepMetric: stepTableProps = {
                idStep: step.idStepProcedure,
                nameStep: stepPro?.nameStep ?? '',
                creationDate: step.startDate?.toString() ?? '',
                endDate: step.endDate?.toString() ?? '',
                estimateDate: estimatedDay.toString(),
                completeStep: step.isComplete,
                ...(step.endDate && { delayStep: new Date(step.endDate) > new Date(estimatedDay) }),
                daysDelayOrOnTime: step.endDate ? new Date(step.endDate) > new Date(estimatedDay) ?
                    calculateDaysDelay(new Date(step.endDate), new Date(estimatedDay)) :
                    new Date(step.endDate) < new Date(estimatedDay) ?
                        calculateDaysDelay(new Date(estimatedDay), new Date(step.endDate)) :
                        0 : 0,
            };

            newMetricStep.push(newStepMetric);
        }
        newMetricStep.sort((a, b) => b.idStep - a.idStep);

        return newMetricStep;
    }

    const calculateDaysDelay = (firstDay: Date, secondDay: Date): number => {
        const difference = firstDay.getTime() - secondDay.getTime();
        return Math.ceil(difference / (1000 * 3600 * 24));
    };

    const obtainDays = (firstDate: Date, secondDate: Date): number => {
        const differenceInMilliseconds = firstDate.getTime() > secondDate.getTime() ?
            firstDate.getTime() - secondDate.getTime() : secondDate.getTime() - firstDate.getTime() ;
        return  Math.ceil(differenceInMilliseconds / (1000 * 60 * 60 * 24));
    }

    const generateDateRange = (startDate : Date, endDate: Date) => {
        const dates = [];
        const currentDate = new Date(startDate);

        dates.push(new Date(currentDate).toDateString());
        currentDate.setDate(currentDate.getDate() + 1);

        while (currentDate <= endDate) {
            dates.push(new Date(currentDate).toDateString());
            currentDate.setDate(currentDate.getDate() + 1);
        }

        setDatesRange(dates);
    }

    const dataGrafics = () => {
        const dataFirst = [];
        const dataSecond = [];

        const startDate = new Date(clientFolder?.creationDate ?? '');
        const endDate = new Date(clientFolder?.endDate ?? '');

        const endDate2 = new Date(metricsClientFolder.dateLastProcedure ?? '');

        const diffDays = obtainDays(startDate, endDate);

        for (let i = 1; i <= diffDays + 1; i++) {

            dataFirst.push(i);
        }

        const diffDaysSecond = obtainDays(startDate, endDate2);

        for (let i = 1; i <= diffDaysSecond + 1; i++) {
            dataSecond.push(i);
        }

        const data: DatasetProps[]  = [
            {
                label: 'Fecha finalizacion o progreso de la carpeta del cliente',
                data: dataSecond,
                borderColor: 'rgb(98,103,103)',
                backgroundColor: 'rgba(52,53,53,0.2)',
            },
            {
                label: 'Fecha estimada de finalizacion de la Carpeta del cliente',
                data: dataFirst,
                borderColor: 'rgb(218,126,52)',
                backgroundColor: 'rgb(250,154,77)',
            },
        ]

        setDataSet(data);
    };

    /* const deleteExistingProcedureFolderClient = useCallback(async (id: number) => {
        try {
            await deleteProcedureFolderClient(id);
            setProcedureFolderClients(procedureFolderClients.filter(c => c.idProcedureFolderClient !== id));
        } catch (err) {
            handleError(err);
        }
    }, [procedureFolderClients]); */

    return {
        dataSet,
        metricsProcedures,
        datesRange,
        metricsClientFolder,
        clientFolder,
        fetchMetricsProcedure,
        loading,
        error,
    };
};