import { useState, useEffect } from 'react';
import { useClientFolders } from './useClientFolders.ts';
import { ClientFolder } from '../../entities/ClientFolder.ts';
import { useTramits } from './useTramits.ts';

export const useClientFoldersByTramitadorId = (tramitId: number) => {
    const { clientFolders } = useClientFolders();
    const { fetchTramitById } = useTramits();
    const [filteredClientFolders, setFilteredClientFolders] = useState<ClientFolder[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

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
            setFilteredClientFolders(filteredFolders.filter((folder): folder is ClientFolder => folder !== null));
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An unknown error occurred');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAndFilterClientFolders();
    }, [tramitId, clientFolders]);

    return { filteredClientFolders, loading, error };
};
