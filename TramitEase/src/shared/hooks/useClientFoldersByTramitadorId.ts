import { useState, useEffect } from 'react';
import { useClientFolders } from './useClientFolders.ts';
import { ClientFolder } from '../../entities/ClientFolder.ts';
import { useTramits } from './useTramits.ts';
import { useProcedureFolderClients } from './useProcedureFolderClient.ts';
import { useStepProcedureFolderClients } from './useStepProcedureFolderClients.ts';
import { useStepProcedures } from './useStepProcedures.ts';

export const useClientFoldersByTramitadorId = (tramitId: number) => {
    const { clientFolders } = useClientFolders();
    const { fetchProcedureFolderClientsByClientFolderId } = useProcedureFolderClients();
    const { fetchStepProcedureFolderClientsByProcedureFolderClientId } = useStepProcedureFolderClients();
    const { fetchStepProcedureById } = useStepProcedures();
    const { fetchTramitById } = useTramits();
    const [filteredClientFolders, setFilteredClientFolders] = useState<ClientFolder[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [error, setError] = useState<string | null>(null);

    const handleSearch = (query: string) => {
        setSearchQuery(query);
    };

    const filteredFolders = filteredClientFolders.filter(folder =>
        folder.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    function calculateEndDate(startDate: Date, daysDuring: number): Date {
        const endDate = new Date(startDate);
        endDate.setDate(endDate.getDate() + daysDuring);
        return endDate;
    }

    const sortClientFolders = async (folders: ClientFolder[]): Promise<ClientFolder[]> => {
        const daysConfigured = Number(localStorage.getItem("daysBeforeDue") ?? 0);

        const tramitPromises = folders.map(async (folder) => {
            const proceduresClientFolder =
                await fetchProcedureFolderClientsByClientFolderId(folder.idClientFolder ?? 0);

            const sortedProcedures = proceduresClientFolder?.sort(
                (a, b) => a.idProcedureFolderClient - b.idProcedureFolderClient
            );

            const folderStatus = {
                overdue: 0,
                maxOverdueDays: 0, // Indicador para registrar el máximo de días vencido
                expiringSoon: 0,
                plentyOfTime: 0,
                noStartDate: 0,
                finalized: 0,
            };

            await Promise.all(
                (sortedProcedures ?? []).map(async (procedureFolder) => {
                    const steps =
                        await fetchStepProcedureFolderClientsByProcedureFolderClientId(procedureFolder.idProcedureFolderClient);

                    const sortedSteps = steps?.sort(
                        (a, b) => a.idStepProcedureFolderClient - b.idStepProcedureFolderClient
                    );

                    await Promise.all(
                        (sortedSteps ?? []).map(async (step) => {
                            if (!step.startDate) {
                                folderStatus.noStartDate++;
                            } else if (step.startDate && !step.endDate) {
                                const stepT = await fetchStepProcedureById(step.idStepProcedure);
                                const startDate = new Date(step.startDate);
                                const today = new Date();

                                const daysPassed = Math.floor((today.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
                                const maxDays = stepT?.dayDuring ?? 0;

                                if (daysPassed > maxDays) {
                                    folderStatus.overdue++;
                                    const overdueDays = daysPassed - maxDays;
                                    folderStatus.maxOverdueDays = Math.max(folderStatus.maxOverdueDays, overdueDays);
                                } else if (daysPassed <= maxDays && daysPassed >= maxDays - daysConfigured) {
                                    folderStatus.expiringSoon++;
                                } else {
                                    folderStatus.plentyOfTime++;
                                }
                            } else if (step.endDate) {
                                folderStatus.finalized++;
                            }
                        })
                    );
                })
            );
            return { folder, folderStatus };
        });

        const foldersWithStatus = await Promise.all(tramitPromises);

        // Ordena según los criterios:
        // 1. Los que tienen más pasos vencidos, priorizando los que tienen mayor cantidad de días vencidos.
        // 2. Los próximos a vencer.
        // 3. Los que tienen tiempo de sobra.
        // 4. Los que no tienen fecha de inicio.
        // 5. Los finalizados.
        return foldersWithStatus
            .sort((a, b) => {
                if (a.folderStatus.overdue !== b.folderStatus.overdue) {
                    return b.folderStatus.overdue - a.folderStatus.overdue; // Más pasos vencidos primero
                }
                if (a.folderStatus.maxOverdueDays !== b.folderStatus.maxOverdueDays) {
                    return b.folderStatus.maxOverdueDays - a.folderStatus.maxOverdueDays; // Más días vencidos primero
                }
                if (a.folderStatus.expiringSoon !== b.folderStatus.expiringSoon) {
                    return b.folderStatus.expiringSoon - a.folderStatus.expiringSoon;
                }
                if (a.folderStatus.plentyOfTime !== b.folderStatus.plentyOfTime) {
                    return b.folderStatus.plentyOfTime - a.folderStatus.plentyOfTime;
                }
                if (a.folderStatus.noStartDate !== b.folderStatus.noStartDate) {
                    return b.folderStatus.noStartDate - a.folderStatus.noStartDate;
                }
                return b.folderStatus.finalized - a.folderStatus.finalized;
            })
            .map((item) => item.folder);
    };

    const fetchAndFilterClientFolders = async () => {
        setLoading(true);
        try {
            const filteredFolders = await Promise.all(
                clientFolders.map(async (folder: ClientFolder) => {
                    const tramit = await fetchTramitById(folder.idTramit);
                    if (tramit && tramit.idTramitador === tramitId) {
                        return folder;
                    }
                    return null;
                })
            );

            const nonNullFolders = filteredFolders.filter((folder): folder is ClientFolder => folder !== null);
            const sortedFolders = await sortClientFolders(nonNullFolders);
            setFilteredClientFolders(sortedFolders);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An unknown error occurred');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAndFilterClientFolders();
    },[tramitId, clientFolders]);

    return { filteredClientFolders, loading, error, handleSearch, filteredFolders, calculateEndDate };
};
