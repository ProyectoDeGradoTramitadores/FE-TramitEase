import axios from 'axios';
import { StepProcedureFolderClient } from '../../../entities/StepProcedureFolderClient.ts';

const api = axios.create({
    baseURL: 'http://localhost:5137/api/StepProcedureFolderClient'
});

export const getStepProcedureFolderClientById = async (id: number): Promise<StepProcedureFolderClient> => {
    const response = await api.get(`/${id}`);
    return response.data;
};

export const getStepProcedureFolderClientsByProcedureFolderClientId = async (procedureFolderClientId: number): Promise<StepProcedureFolderClient[]> => {
    const response = await api.get(`/byProcedureFolderClient/${procedureFolderClientId}`);
    return response.data;
};

export const getStepProcedureFolderClientByProcedureAndStep = async (stepId: number): Promise<StepProcedureFolderClient> => {
    const response = await api.get(`/byProcedureAndStep/${stepId}`);
    return response.data;
};

export const getAllStepProcedureFolderClients = async (): Promise<StepProcedureFolderClient[]> => {
    const response = await api.get('/');
    return response.data;
};

export const createStepProcedureFolderClient = async (stepProcedureFolderClient: StepProcedureFolderClient): Promise<void> => {
    await api.post('/', stepProcedureFolderClient);
};

export const updateStepProcedureFolderClient = async (id: number, stepProcedureFolderClient: StepProcedureFolderClient): Promise<void> => {
    await api.put(`/${id}`, stepProcedureFolderClient);
};

export const deleteStepProcedureFolderClient = async (id: number): Promise<void> => {
    await api.delete(`/${id}`);
};
