import { useEffect, useState } from 'react';
import { ClientFolder } from '../../entities/ClientFolder.ts';
import {
    createClientFolder,
    deleteClientFolder,
    getClientFolderById,
    getClientFolders,
    getClientFoldersByClientId,
    getClientFoldersByTramitId,
    updateClientFolder,
} from '../services/FolderClientService/ClientFolderService.ts';


export const useClientFolders = () => {
    const [clientFolders, setClientFolders] = useState<ClientFolder[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchClientFolders = async () => {
            try {
                const data = await getClientFolders();
                setClientFolders(data);
                setLoading(false);
            } catch (err) {
                if (err instanceof Error) {
                    setError(err.message);
                } else {
                    setError('An unknown error occurred');
                }
                setLoading(false);
            }
        };

        fetchClientFolders();
    }, []);

    const fetchClientFolderById = async (id: number): Promise<ClientFolder | undefined> => {
        try {
            const clientFolder = await getClientFolderById(id);
            return clientFolder;
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError('An unknown error occurred');
            }
        }
        return undefined;
    };

    const fetchClientFoldersByClientId = async (clientId: number): Promise<ClientFolder[]> => {
        try {
            return await getClientFoldersByClientId(clientId);
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError('An unknown error occurred');
            }
            return [];
        }
    };

    const fetchClientFoldersByTramitId = async (TramitId: number): Promise<ClientFolder[]> => {
        try {
            return await getClientFoldersByTramitId(TramitId);
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError('An unknown error occurred');
            }
            return [];
        }
    };

    const createNewClientFolder = async (clientFolder: ClientFolder):  Promise<ClientFolder | undefined> => {
        try {
            const clientFolde = await createClientFolder(clientFolder);
            setClientFolders([...clientFolders, clientFolder]);
            return clientFolde;
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError('An unknown error occurred');
            }
            return undefined;
        }
    };

    const updateExistingClientFolder = async (id: number, clientFolder: ClientFolder) => {
        try {
            await updateClientFolder(id, clientFolder);
            setClientFolders(clientFolders.map(c => (c.idClientFolder === id ? clientFolder : c)));
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError('An unknown error occurred');
            }
        }
    };

    const deleteExistingClientFolder = async (id: number) => {
        try {
            await deleteClientFolder(id);
            setClientFolders(clientFolders.filter(c => c.idClientFolder !== id));
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError('An unknown error occurred');
            }
        }
    };

    return { clientFolders, loading, error, fetchClientFolderById, fetchClientFoldersByClientId, fetchClientFoldersByTramitId, createNewClientFolder, updateExistingClientFolder, deleteExistingClientFolder };
};
