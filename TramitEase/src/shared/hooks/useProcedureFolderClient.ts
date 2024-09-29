import { useEffect, useState, useCallback } from 'react';
import { ProcedureFolderClient } from '../../entities/ProcedureFolderClient.ts';
import {
    createProcedureFolderClient, deleteProcedureFolderClient,
    getAllProcedureFolderClients, getProcedureFolderClientById,
     getProcedureFolderClientsByClientFolderId,
    updateProcedureFolderClient
} from '../services/FolderClientService/ProcedureFolderClientService.ts';

export const useProcedureFolderClients = () => {
    const [procedureFolderClients, setProcedureFolderClients] = useState<ProcedureFolderClient[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const handleError = (err: unknown) => {
        if (err instanceof Error) {
            setError(err.message);
        } else {
            setError('An unknown error occurred');
        }
        setLoading(false);
    };

    useEffect(() => {
        const fetchProcedureFolderClients = async () => {
            try {
                const data = await getAllProcedureFolderClients();
                setProcedureFolderClients(data);
            } catch (err) {
                handleError(err);
            } finally {
                setLoading(false);
            }
        };
        fetchProcedureFolderClients();
    }, []);

    const fetchProcedureFolderClientById = useCallback(async (id: number) => {
        try {
            return await getProcedureFolderClientById(id);
        } catch (err) {
            handleError(err);
        }
    }, []);

    const fetchProcedureFolderClientsByClientFolderId = useCallback(async (clientFolderId: number) => {
        try {
            const data = await getProcedureFolderClientsByClientFolderId(clientFolderId);
            setProcedureFolderClients(data);
            return data;
        } catch (err) {
            handleError(err);
        }
    }, []);

    const createNewProcedureFolderClient = useCallback(async (client: ProcedureFolderClient) => {
        try {
            const newClient = await createProcedureFolderClient(client);
            setProcedureFolderClients([...procedureFolderClients, newClient]);
            return newClient;
        } catch (err) {
            handleError(err);
        }
    }, [procedureFolderClients]);

    const updateExistingProcedureFolderClient = useCallback(async (id: number, client: ProcedureFolderClient) => {
        try {
            await updateProcedureFolderClient(id, client);
            setProcedureFolderClients(procedureFolderClients.map(c => c.idProcedureFolderClient === id ? client : c));
            return client;
        } catch (err) {
            handleError(err);
        }
    }, [procedureFolderClients]);

    const deleteExistingProcedureFolderClient = useCallback(async (id: number) => {
        try {
            await deleteProcedureFolderClient(id);
            setProcedureFolderClients(procedureFolderClients.filter(c => c.idProcedureFolderClient !== id));
        } catch (err) {
            handleError(err);
        }
    }, [procedureFolderClients]);

    return {
        procedureFolderClients,
        loading,
        error,
        fetchProcedureFolderClientById,
        fetchProcedureFolderClientsByClientFolderId,
        createNewProcedureFolderClient,
        updateExistingProcedureFolderClient,
        deleteExistingProcedureFolderClient
    };
};
