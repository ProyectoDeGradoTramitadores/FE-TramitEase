import axios from 'axios';
import { ProcedureFolderClient } from '../../../entities/ProcedureFolderClient.ts';

const api = axios.create({
    baseURL: 'http://localhost:5137/api/ProcedureFolderClient'
});

export const getProcedureFolderClientById = async (id: number): Promise<ProcedureFolderClient> => {
    const response = await api.get(`/${id}`);
    return response.data;
};

export const getProcedureFolderClientsByProcedureId = async (procedureId: number): Promise<ProcedureFolderClient[]> => {
    const response = await api.get(`/byProcedure/${procedureId}`);
    return response.data;
};

export const getProcedureFolderClientsByClientFolderId = async (clientFolderId: number): Promise<ProcedureFolderClient[]> => {
    const response = await api.get(`/byClientFolder/${clientFolderId}`);
    return response.data;
};

export const getAllProcedureFolderClients = async (): Promise<ProcedureFolderClient[]> => {
    const response = await api.get('/');
    return response.data;
};

export const createProcedureFolderClient = async (procedureFolderClient: ProcedureFolderClient): Promise<ProcedureFolderClient> => {
    const response = await api.post('/', procedureFolderClient);
    return response.data;
};

export const updateProcedureFolderClient = async (id: number, procedureFolderClient: ProcedureFolderClient): Promise<void> => {
    await api.put(`/${id}`, procedureFolderClient);
};

export const deleteProcedureFolderClient = async (id: number): Promise<void> => {
    await api.delete(`/${id}`);
};
