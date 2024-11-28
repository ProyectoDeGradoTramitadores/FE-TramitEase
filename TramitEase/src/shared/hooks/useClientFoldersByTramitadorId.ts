import { useState, useEffect } from 'react';
import { useClientFolders } from './useClientFolders.ts';
import { ClientFolder } from '../../entities/ClientFolder.ts';
import { useTramits } from './useTramits.ts';

export const useClientFoldersByTramitadorId = (tramitId: number) => {
    const { clientFolders } = useClientFolders();
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
        const tramitPromises = folders.map(async (folder) => {
            const tramitData = await fetchTramitById(folder.idTramit);
            return { folder, tramitData };
        });

        return await Promise.all(tramitPromises).then(tramitResults => {
            const sortedClientFolders = tramitResults.sort((a, b) => {
                const { folder: folderA, tramitData: tramitA } = a;
                const { folder: folderB, tramitData: tramitB } = b;

                console.log(folderB.name, folderA.name)

                if (folderA.creationDate && folderA.endDate) return 1;
                if (folderB.creationDate && folderB.endDate) return -1;

                if (!folderA.creationDate || !tramitA?.dayDuring) return 1;
                if (!folderB.creationDate || !tramitB?.dayDuring) return -1;

                const expirationA = calculateEndDate(new Date(folderA.creationDate), tramitA.dayDuring);
                const expirationB = calculateEndDate(new Date(folderB.creationDate), tramitB.dayDuring);

                if (new Date() < new Date(expirationA) && expirationA < expirationB) return -1;
                if (new Date() < new Date(expirationB) && expirationA > expirationB) return 1;

                if (new Date() >= new Date(expirationA) && expirationA < expirationB) return -1;
                if (new Date() >= new Date(expirationB) && expirationA > expirationB) return 1;

                return 0;
            });

            return sortedClientFolders.map(result => result.folder);
        });
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
