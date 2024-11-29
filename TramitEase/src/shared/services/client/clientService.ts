import axios from 'axios';
import { Client } from '../../../entities/Client.ts';

const api = axios.create({
    baseURL: `${import.meta.env.VITE_BACKEND_URL}/Client`
});

export const getClients = async (): Promise<Client[]> => {
    const response = await api.get('/');
    return response.data;
};

export const checkClientExists = async (id: number): Promise<boolean> => {
    try {
        const response = await api.get(`/${id}`);
        return response.status === 200;
    } catch (error) {
        return false;
    }
};

export const getClientById = async (id: number): Promise<Client> => {
    const response = await api.get(`/${id}`);
    return response.data;
};

export const getClientsByTramitadorId = async (tramitadorId: number): Promise<Client[]> => {
    const response = await api.get(`/tramitador/${tramitadorId}`);
    return response.data;
};

export const createClient = async (client: Client): Promise<Client> => {
    const response = await api.post('/', client);
    return response.data;
};

export const updateClient = async (id: number, client: Client): Promise<void> => {
    await api.put(`/${id}`, client);
};

export const deleteClient = async (id: number): Promise<void> => {
    await api.delete(`/${id}`);
};
