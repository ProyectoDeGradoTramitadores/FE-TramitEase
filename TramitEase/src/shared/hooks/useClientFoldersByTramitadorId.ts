import { useState, useEffect } from 'react';
import { useClientFolders } from './useClientFolders.ts';
import { ClientFolder } from '../../entities/ClientFolder.ts';

export const useClientFoldersByTramitadorId = (tramitId: number) => {
    const { fetchClientFoldersByTramitId } = useClientFolders();
    const [filteredClientFolders, setFilteredClientFolders] = useState<ClientFolder[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchAndFilterClientFolders = async () => {
        setLoading(true);
        try {
            const folders = await fetchClientFoldersByTramitId(tramitId);
            setFilteredClientFolders(folders);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An unknown error occurred');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAndFilterClientFolders();
    }, [tramitId]);

    return { filteredClientFolders, loading, error };
};
