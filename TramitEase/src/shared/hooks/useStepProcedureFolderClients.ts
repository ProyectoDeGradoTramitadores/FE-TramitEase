import { useEffect, useState } from 'react';
import { StepProcedureFolderClient } from '../../entities/StepProcedureFolderClient.ts';
import {
    createStepProcedureFolderClient, deleteStepProcedureFolderClient,
    getAllStepProcedureFolderClients,
    getStepProcedureFolderClientById, updateStepProcedureFolderClient,
    getStepProcedureFolderClientsByProcedureFolderClientId,
    getStepProcedureFolderClientByProcedureAndStep
} from '../services/FolderClientService/StepProcedureFolderClientService.ts';


export const useStepProcedureFolderClients = () => {
    const [stepProcedureFolderClients, setStepProcedureFolderClients] = useState<StepProcedureFolderClient[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchStepProcedureFolderClients = async () => {
            try {
                const data = await getAllStepProcedureFolderClients();
                setStepProcedureFolderClients(data);
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

        fetchStepProcedureFolderClients();
    }, []);

    const fetchStepProcedureFolderClientById = async (id: number): Promise<StepProcedureFolderClient | undefined> => {
        try {
            const client = await getStepProcedureFolderClientById(id);
            return client;
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError('An unknown error occurred');
            }
        }
        return undefined;
    };

    const fetchStepProcedureFolderClientsByProcedureFolderClientId = async (procedureFolderClientId: number): Promise<StepProcedureFolderClient[] | undefined> => {
        try {
            const data = await getStepProcedureFolderClientsByProcedureFolderClientId(procedureFolderClientId);
            setStepProcedureFolderClients(data);
            return data;
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError('An unknown error occurred');
            }
        }
        return undefined;
    };

    const fetchStepProcedureFolderClientByProcedureAndStep = async (stepId: number): Promise<StepProcedureFolderClient | undefined> => {
        try {
            const client = await getStepProcedureFolderClientByProcedureAndStep(stepId);
            return client;
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError('An unknown error occurred');
            }
        }
        return undefined;
    };

    const createNewStepProcedureFolderClient = async (client: StepProcedureFolderClient): Promise<StepProcedureFolderClient | undefined> => {
        try {
            const newClient = await createStepProcedureFolderClient(client);
            if (newClient != null) {
                setStepProcedureFolderClients([...stepProcedureFolderClients, newClient]);
            }
            return client;
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError('An unknown error occurred');
            }
        }
    };

    const updateExistingStepProcedureFolderClient = async (id: number, client: StepProcedureFolderClient): Promise<StepProcedureFolderClient | undefined> => {
        try {
            await updateStepProcedureFolderClient(id, client);
            setStepProcedureFolderClients(stepProcedureFolderClients.map(c => (c.idStepProcedureFolderClient === id ? client : c)));
            return client;
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError('An unknown error occurred');
            }
        }
    };

    const deleteExistingStepProcedureFolderClient = async (id: number) => {
        try {
            await deleteStepProcedureFolderClient(id);
            setStepProcedureFolderClients(stepProcedureFolderClients.filter(c => c.idStepProcedureFolderClient !== id));
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError('An unknown error occurred');
            }
        }
    };

    return {
        stepProcedureFolderClients,
        loading,
        error,
        fetchStepProcedureFolderClientById,
        fetchStepProcedureFolderClientsByProcedureFolderClientId,
        fetchStepProcedureFolderClientByProcedureAndStep,
        createNewStepProcedureFolderClient,
        updateExistingStepProcedureFolderClient,
        deleteExistingStepProcedureFolderClient
    };
};
