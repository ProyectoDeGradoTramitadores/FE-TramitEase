import axios from 'axios';
import { Client } from '../../../entities/Client.ts';

const api = axios.create({
    baseURL: 'http://localhost:5137/api/Client'
});

export const getClients = async (): Promise<Client[]> => {
    const response = await api.get('/');
    return response.data;
};

export const checkClientExists = async (id: string): Promise<boolean> => {
    try {
        const response = await api.get(`/${id}`);
        return response.status === 200;
    } catch (error) {
        return false;
    }
};

export const getClientById = async (id: string): Promise<Client> => {
    const response = await api.get(`/${id}`);
    return response.data;
};

export const getClientsByTramitadorId = async (tramitadorId: number): Promise<Client[]> => {
    const response = await api.get(`/tramitador/${tramitadorId}`);
    return response.data;
};

export const createClient = async (client: Client): Promise<void> => {
    await api.post('/', client);
};

export const updateClient = async (id: string, client: Client): Promise<void> => {
    await api.put(`/${id}`, client);
};

export const deleteClient = async (id: string): Promise<void> => {
    await api.delete(`/${id}`);
};
