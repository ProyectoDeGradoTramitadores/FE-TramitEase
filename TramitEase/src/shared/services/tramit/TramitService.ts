import axios from 'axios';
import { Tramit } from '../../../entities/Tramit.ts';

const api = axios.create({
    baseURL: 'http://localhost:5137/api'
});

export const getTramits = async (): Promise<Tramit[]> => {
    const response = await api.get('/tramit');
    return response.data;
};

export const getTramitById = async (id: number): Promise<Tramit> => {
    const response = await api.get(`/tramit/${id}`);
    return response.data;
};

export const createTramit = async (tramit: Tramit): Promise<Tramit> => {
    const response= await api.post('/tramit', tramit);
    return response.data;
};

export const updateTramit = async (id: number, tramit: Tramit): Promise<void> => {
    await api.put(`/tramit/${id}`, tramit);
};

export const deleteTramit = async (id: number): Promise<void> => {
    await api.delete(`/tramit/${id}`);
};

export const getTramitsByTypeId = async (typeId: number): Promise<Tramit[]> => {
    const response = await api.get(`/tramit/type/${typeId}`);
    return response.data;
};

export const getTramitsByTramitadorId = async (typeId: number): Promise<Tramit[]> => {
    const response = await api.get(`/tramit/tramitador/${typeId}`);
    return response.data;
};