import axios from 'axios';
import { Document } from '../../../entities/Document.ts';

const api = axios.create({
    baseURL: 'http://localhost:5137/api/Document'
});

export const getDocuments = async (): Promise<Document[]> => {
    const response = await api.get('/');
    return response.data;
};

export const getDocumentById = async (id: number): Promise<Document> => {
    const response = await api.get(`/${id}`);
    return response.data;
};

export const createDocument = async (document: Document): Promise<Document> => {
    const response = await api.post('/', document);
    return response.data;
};

export const updateDocument = async (id: number, document: Document): Promise<void> => {
    await api.put(`/${id}`, document);
};

export const deleteDocument = async (id: number): Promise<void> => {
    await api.delete(`/${id}`);
};

export const getDocumentsByStepProcedureId = async (idStepProcedure: number): Promise<Document[]> => {
    const response = await api.get(`/step/${idStepProcedure}`);
    return response.data;
};
