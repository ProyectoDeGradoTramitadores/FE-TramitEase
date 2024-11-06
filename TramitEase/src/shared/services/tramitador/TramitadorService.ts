import axios from 'axios';
import { Tramitador } from '../../../entities/Tramitador.ts';

const api = axios.create({
    baseURL: 'http://localhost:5137/api/Tramitador'
});

export const getTramitadores = async (): Promise<Tramitador[]> => {
    const response = await api.get('/');
    return response.data;
};

export const getTramitadorById = async (id: number): Promise<Tramitador> => {
    const response = await api.get(`/${id}`);
    return response.data;
};

export const createTramitador = async (tramitador: Tramitador): Promise<Tramitador> => {
    const response = await api.post('/', tramitador);
    return response.data;
};

export const updateTramitador = async (id: number, tramitador: Tramitador): Promise<void> => {
    await api.put(`/${id}`, tramitador);
};

export const deleteTramitador = async (id: number): Promise<void> => {
    await api.delete(`/${id}`);
};
