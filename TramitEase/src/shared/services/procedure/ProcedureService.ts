import axios from 'axios';
import { Procedure } from '../../../entities/Procedure.ts';

const api = axios.create({
    baseURL: `${import.meta.env.VITE_BACKEND_URL}/Procedure`
});

export const getProcedures = async (): Promise<Procedure[]> => {
    const response = await api.get('/');
    return response.data;
};

export const checkProcedureExists = async (id: number): Promise<boolean> => {
    try {
        const response = await api.get(`/${id}`);
        return response.status === 200;
    } catch (error) {
        return false;
    }
};

export const getProcedureById = async (id: number): Promise<Procedure> => {
    const response = await api.get(`/${id}`);
    return response.data;
};

export const getProceduresByTramitadorId = async (tramitadorId: number): Promise<Procedure[]> => {
    const response = await api.get(`/byTramitador/${tramitadorId}`);
    return response.data;
};

export const createProcedure = async (procedure: Procedure): Promise<Procedure> => {
    const response = await api.post('/', procedure);
    return response.data;
};

export const updateProcedure = async (id: number, procedure: Procedure): Promise<void> => {
    await api.put(`/${id}`, procedure);
};

export const deleteProcedure = async (id: number): Promise<void> => {
    await api.delete(`/${id}`);
};
