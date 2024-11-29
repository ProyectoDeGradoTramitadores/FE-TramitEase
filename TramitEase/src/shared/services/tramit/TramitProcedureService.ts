import axios from 'axios';
import { TramitProcedure } from '../../../entities/TramitProcedure.ts';

const api = axios.create({
    baseURL: `${import.meta.env.VITE_BACKEND_URL}/TramitProcedure`
});

export const getTramitProcedureById = async (id: number): Promise<TramitProcedure> => {
    const response = await api.get(`/${id}`);
    return response.data;
};

export const getAllTramitProcedures = async (): Promise<TramitProcedure[]> => {
    const response = await api.get('/');
    return response.data;
};

export const getTramitProceduresByTramitId = async (tramitId: number): Promise<TramitProcedure[]> => {
    const response = await api.get(`/tramit/${tramitId}`);
    return response.data;
};

export const getTramitProceduresByProcedureId = async (procedureId: number): Promise<TramitProcedure[]> => {
    const response = await api.get(`/procedure/${procedureId}`);
    return response.data;
};

export const createTramitProcedure = async (tramitProcedure: TramitProcedure): Promise<void> => {
    await api.post('/', tramitProcedure);
};

export const updateTramitProcedure = async (id: number, tramitProcedure: TramitProcedure): Promise<void> => {
    await api.put(`/${id}`, tramitProcedure);
};

export const deleteTramitProcedure = async (id: number): Promise<void> => {
    await api.delete(`/${id}`);
};
