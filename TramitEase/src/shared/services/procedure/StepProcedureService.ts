import axios from 'axios';
import { StepProcedure } from '../../../entities/StepProcedure.ts';

const api = axios.create({
    baseURL: 'http://localhost:5137/api/StepProcedure'
});

export const getStepProcedures = async (): Promise<StepProcedure[]> => {
    const response = await api.get('/');
    return response.data;
};

export const getStepProcedureById = async (id: number): Promise<StepProcedure> => {
    const response = await api.get(`/${id}`);
    return response.data;
};

export const getStepProceduresByProcedureId = async (procedureId: number): Promise<StepProcedure[]> => {
    const response = await api.get(`/procedure/${procedureId}`);
    return response.data;
};

export const createStepProcedure = async (stepProcedure: StepProcedure): Promise<StepProcedure> => {
    const response = await api.post('/', stepProcedure);
    return response.data;
};

export const updateStepProcedure = async (id: number, stepProcedure: StepProcedure): Promise<void> => {
    await api.put(`/${id}`, stepProcedure);
};

export const deleteStepProcedure = async (id: number): Promise<void> => {
    await api.delete(`/${id}`);
};
