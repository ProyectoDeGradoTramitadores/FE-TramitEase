import axios from 'axios';
import { ClientFolder } from '../../../entities/ClientFolder.ts';

const api = axios.create({
    baseURL: `${import.meta.env.VITE_BACKEND_URL}/ClientFolder`
});

export const getClientFolders = async (): Promise<ClientFolder[]> => {
    const response = await api.get('/');
    return response.data;
};

export const getClientFoldersByClientId = async (clientId: number): Promise<ClientFolder[]> => {
    const response = await api.get(`/client/${clientId}`);
    return response.data;
};

export const getClientFoldersByTramitId = async (tramitId: number): Promise<ClientFolder[]> => {
    const response = await api.get(`tramit/${tramitId}`);
    return response.data;
};

export const getClientFolderById = async (id: number): Promise<ClientFolder> => {
    const response = await api.get(`/${id}`);
    return response.data;
};

export const createClientFolder = async (clientFolder: ClientFolder):  Promise<ClientFolder> => {
    const response = await api.post('/', clientFolder);
    return response.data;
};

export const updateClientFolder = async (id: number, clientFolder: ClientFolder): Promise<void> => {
    await api.put(`/${id}`, clientFolder);
};

export const deleteClientFolder = async (id: number): Promise<void> => {
    await api.delete(`/${id}`);
};
