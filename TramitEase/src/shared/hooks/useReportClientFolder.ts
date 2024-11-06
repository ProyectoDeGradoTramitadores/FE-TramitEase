import { useEffect, useMemo, useState } from 'react';
import { useTramits } from './useTramits.ts';
import { useTypeTramits } from './useTypeTramits.ts';
import { ClientFolder, TramitReportsProps } from '../types/MetricsClientFolderProps.ts';
import { useTramitProcedures } from './useTramitProcedures.ts';
import { useProcedureFolderClients } from './useProcedureFolderClient.ts';
import { useClientFoldersByTramitadorId } from './useClientFoldersByTramitadorId.ts';
import { IDS } from '../constants/routes.ts';

export const useReportClientFolder = () => {
    const idTramitador = IDS().TRAMITADOR_ID
    const { filteredClientFolders } = useClientFoldersByTramitadorId(Number(idTramitador));
    const { fetchProcedureFolderClientsByClientFolderId } = useProcedureFolderClients();
    const { fetchTramitById, tramits } = useTramits();
    const { fetchTramitProceduresByTramitId } = useTramitProcedures();
    const { fetchTypeTramitById } = useTypeTramits();

    const [tramitsByType, setTramitsByType] = useState<Record<string, number>>({});
    const [tramitsMetric, setTramitsMetric] = useState<TramitReportsProps[]>([]);
    const [tramitsById, setTramitsById] = useState<Record<string, number>>({});

    const totalClientFolders = useMemo(() => filteredClientFolders.length, [filteredClientFolders]);

    const calculateEstimatedDate = (startDate: string | Date, durationDays: number) => {
        if (!startDate || isNaN(new Date(startDate).getTime())) {
            return 'N/A';
        }
        const start = new Date(startDate);
        const estimatedDate = new Date(start);
        estimatedDate.setDate(start.getDate() + durationDays);
        return estimatedDate.toISOString().split('T')[0];
    };

    useEffect(() => {
        const fetchTramits = async () => {
            const tramitsByTypeAccumulator: Record<string, number> = {};
            const tramitsByIdAccumulator: Record<string, number> = {};

            for (const folder of filteredClientFolders) {
                const tramit = await fetchTramitById(folder.idTramit);
                const typeTramit = await fetchTypeTramitById(tramit?.idTypeTramit ?? 0);

                if (typeTramit) {
                    tramitsByTypeAccumulator[typeTramit?.name ?? ""] =
                        (tramitsByTypeAccumulator[typeTramit.name ?? ""] || 0) + 1;
                }

                if (tramit) {
                    tramitsByIdAccumulator[tramit?.name ?? ""] =
                        (tramitsByIdAccumulator[tramit.name ?? ""] || 0) + 1;
                }
            }

            for (const tramit of tramits){
                const typeTramit = await fetchTypeTramitById(tramit?.idTypeTramit ?? 0);
                const numberdeProcedures = await fetchTramitProceduresByTramitId(tramit?.idTramit);
                const tramitsCLientFOlder : ClientFolder[] = [];

                const clientFoldersForTramit = filteredClientFolders.filter(
                    (folder) => folder.idTramit === tramit.idTramit
                );

                let proceduresFolderDays = 0;
                let completeClientFolder = 0;
                let dateEnd : Date | null = null
                const porcentageClientFolder: Record<string, number> = {};

                const clientFoldersWithDelaysForTramit: ClientFolder[] =
                    await Promise.all(clientFoldersForTramit.map(async (folder) => {
                        const proceduresFolder = await fetchProcedureFolderClientsByClientFolderId(folder.idClientFolder ?? 0);
                        let completionPercentage = 0;

                        if(proceduresFolder?.[proceduresFolder.length -1]?.isComplete){
                            completeClientFolder += 1;
                        }

                        proceduresFolder?.forEach((proc) => {
                            if (proc.isComplete ) {
                                if(dateEnd != null && new Date(proc.startDate?? '') > dateEnd){
                                    dateEnd = new Date(proc.endDate ?? '') ;
                                    proceduresFolderDays += calculateDaysBetweenDates(
                                        proc.startDate?.toString(),
                                        proc.endDate?.toString()
                                    );
                                }
                                completionPercentage += 1
                            }
                        });

                        const daysEstimate = folder.creationDate?
                            calculateDaysBetweenDates(folder.creationDate, folder.endDate ?? '') : 0;
                        let isDelayClientFolder = false;
                        proceduresFolderDays = Math.abs(proceduresFolderDays);

                        if (proceduresFolderDays <= daysEstimate) {
                            proceduresFolderDays = daysEstimate - proceduresFolderDays;
                        } else {
                            isDelayClientFolder = true;
                            proceduresFolderDays = proceduresFolderDays - daysEstimate;
                        }

                        porcentageClientFolder[folder.name] = completionPercentage / (proceduresFolder?.length ?? 0);
                        return {
                            clientFolderName: folder.name,
                            durationDays: daysEstimate,
                            startDate: folder?.creationDate?.toString() ?? undefined,
                            estimatedCompletionDate: folder?.creationDate && tramit.dayDuring?
                                calculateEstimatedDate(folder?.creationDate, tramit.dayDuring): undefined,
                            completionDate: proceduresFolder?.[proceduresFolder.length - 1]?.endDate?.toString() ?? '',
                            isCompleted: (proceduresFolder?.[proceduresFolder.length - 1]?.isComplete) ?? false,
                            isDelay: isDelayClientFolder,
                            delayOrSurplusDays: proceduresFolderDays,
                        };
                    }));

                tramitsCLientFOlder.push(...clientFoldersWithDelaysForTramit);

                const newData : TramitReportsProps = {
                    procedureName: tramit.name ?? "",
                    procedureType: typeTramit?.name?? "",
                    numberOfProcedures: numberdeProcedures?.length ?? 0,
                    durationDays: tramit.dayDuring ?? 0,
                    rows: tramitsCLientFOlder,
                    porcentageClientFolder: porcentageClientFolder,
                    porcentageTotal: completeClientFolder * 100  / clientFoldersForTramit.length,
                }

                setTramitsMetric((prevTramitsMetric) => [
                    ...prevTramitsMetric,
                    newData,
                ]);
            }

            setTramitsByType(tramitsByTypeAccumulator);
            setTramitsById(tramitsByIdAccumulator);
        };

        fetchTramits();
    }, [filteredClientFolders]);

    const calculateDaysBetweenDates = (startDate?: string, endDate?: string): number => {
        if (!startDate || !endDate) {
            return 0;
        }

        const start = new Date(startDate);
        const end = new Date(endDate);
        const diffInMs = Math.abs(end.getTime() - start.getTime());
        const result = Math.ceil(diffInMs / (1000 * 60 * 60 * 24));
        return result > 0? result : 1;
    };


    return {
        tramitsMetric,
        totalClientFolders,
        tramitsByType,
        tramitsById,
    };
};
