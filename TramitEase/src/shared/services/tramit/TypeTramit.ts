import axios from 'axios';
import { TypeTramit } from '../../../entities/TypeTramit.ts';

const api = axios.create({
    baseURL: 'http://localhost:5137/api'
});

export const getTypeTramits = async (): Promise<TypeTramit[]> => {
    const response = await api.get('/typeTramit');
    return response.data;
};

export const getTypeTramitById = async (id: number): Promise<TypeTramit> => {
    const response = await api.get(`/typeTramit/${id}`);
    return response.data;
};

export const createTypeTramit = async (typeTramit: TypeTramit): Promise<void> => {
    await api.post('/typeTramit', typeTramit);
};

export const updateTypeTramit = async (id: number, typeTramit: TypeTramit): Promise<void> => {
    await api.put(`/typeTramit/${id}`, typeTramit);
};

export const deleteTypeTramit = async (id: number): Promise<void> => {
    await api.delete(`/typeTramit/${id}`);
};