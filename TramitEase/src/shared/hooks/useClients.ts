import { useEffect, useState } from 'react';
import { Client } from '../../entities/Client.ts';
import {
    createClient,
    deleteClient,
    getClientById,
    getClients,
    updateClient,
    checkClientExists,
} from '../services/client/clientService.ts';

export const useClients = () => {
    const [clients, setClients] = useState<Client[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchClients = async () => {
            try {
                const data = await getClients();
                setClients(data);
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

        fetchClients().then(r => console.log(r));
    }, []);

    const fetchClientById = async (id: string): Promise<Client | undefined> => {
        try {
            const client = await getClientById(id);
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

    const checkClientExistsAndFetch = async (id: string): Promise<Client | null> => {
        try {
            const exists = await checkClientExists(id);
            if (exists) {
                const client = await getClientById(id);
                return client;
            }
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError('An unknown error occurred');
            }
        }
        return null;
    };

    const createNewClient = async (client: Client) => {
        try {
            const newClient = await createClient(client);
            if (newClient != null) {
                setClients([...clients, newClient]);
            }
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError('An unknown error occurred');
            }
        }
    };

    const updateExistingClient = async (id: string, client: Client) => {
        try {
            await updateClient(id, client);
            setClients(clients.map(t => (t.idClient === id ? client : t)));
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError('An unknown error occurred');
            }
        }
    };

    const deleteExistingClient = async (id: string) => {
        try {
            await deleteClient(id);
            setClients(clients.filter(t => t.idClient !== id));
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError('An unknown error occurred');
            }
        }
    };

    return { clients, loading, error, fetchClientById, createNewClient, updateExistingClient, deleteExistingClient, checkClientExistsAndFetch };
};
