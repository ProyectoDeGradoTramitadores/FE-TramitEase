import axios from 'axios';
import { ProcedureTramit } from '../../../entities/ProcedureTramit.ts';

const api = axios.create({
    baseURL: 'http://localhost:5137/api/ProcedureTramitador'
});

export const getProcedureTramitadors = async (): Promise<ProcedureTramit[]> => {
    const response = await api.get('/');
    return response.data;
};

export const checkProcedureTramitadorExists = async (id: number): Promise<boolean> => {
    try {
        const response = await api.get(`/${id}`);
        return response.status === 200;
    } catch (error) {
        return false;
    }
};

export const getProcedureTramitadorById = async (id: number): Promise<ProcedureTramit> => {
    const response = await api.get(`/${id}`);
    return response.data;
};

export const createProcedureTramitador = async (procedureTramitador: ProcedureTramit): Promise<void> => {
    await api.post('/', procedureTramitador);
};

export const updateProcedureTramitador = async (id: number, procedureTramitador: ProcedureTramit): Promise<void> => {
    await api.put(`/${id}`, procedureTramitador);
};

export const deleteProcedureTramitador = async (id: number): Promise<void> => {
    await api.delete(`/${id}`);
};

export const getProcedureTramitadorsByTramitadorId = async (idTramitador: number): Promise<ProcedureTramit[]> => {
    const response = await api.get(`/tramitador/${idTramitador}`);
    return response.data;
};

export const getProcedureTramitadorsByProcedureId = async (idProcedure: number): Promise<ProcedureTramit[]> => {
    const response = await api.get(`/procedure/${idProcedure}`);
    return response.data;
};
