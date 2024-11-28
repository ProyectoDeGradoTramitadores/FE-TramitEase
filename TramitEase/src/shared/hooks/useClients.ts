import { useEffect, useState } from 'react';
import { Client } from '../../entities/Client.ts';
import {
    createClient,
    deleteClient,
    getClientById,
    getClients,
    updateClient, getClientsByTramitadorId,
} from '../services/client/clientService.ts';
import { emptyClient } from '../constants/ClientCreate.ts';

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

        fetchClients();
    }, []);

    const fetchClientsByTramitadorId = async (tramitadorId: number) => {
        try {
            setLoading(true);
            const data = await getClientsByTramitadorId(tramitadorId);
            setClients(data);
            return data;
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError('An unknown error occurred');
            }
        } finally {
            setLoading(false);
        }
    };

    const fetchClientById = async (id: number): Promise<Client | undefined> => {
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
            const clients = await fetchClientsByTramitadorId(emptyClient.idTramitador);
            const exists = clients?.find(client => client.ciClient === id);

            if (exists) {
                return exists;
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

    const createNewClient = async (client: Client): Promise<Client | null> => {
        try {
            const newClient = await createClient(client);
            if (newClient != null) {
                setClients([...clients, newClient]);
                return newClient;
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

    const updateExistingClient = async (id: number, client: Client) => {
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

    const deleteExistingClient = async (id: number) => {
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

    return { clients, loading, error, fetchClientsByTramitadorId,
        fetchClientById, createNewClient, updateExistingClient,
        deleteExistingClient, checkClientExistsAndFetch };
};
