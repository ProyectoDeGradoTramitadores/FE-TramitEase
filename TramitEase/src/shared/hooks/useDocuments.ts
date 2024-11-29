import { useEffect, useState } from 'react';
import { Document } from '../../entities/Document.ts';
import {
    createDocument,
    deleteDocument,
    getDocumentById,
    getDocuments,
    updateDocument,
    getDocumentsByStepProcedureId,
} from '../services/document/documentService.ts';

export const useDocuments = () => {
    const [documents, setDocuments] = useState<Document[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchDocuments = async () => {
            try {
                const data = await getDocuments();
                setDocuments(data);
                setLoading(false);
            } catch (err) {
                if (err instanceof Error) {
                    setError(err.message);
                } else {
                    setError('An unknown error occurred');
                }
                setLoading(false);
            }
        };

        fetchDocuments();
    }, []);

    const fetchDocumentById = async (id: number): Promise<Document | undefined> => {
        try {
            const document = await getDocumentById(id);
            return document;
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError('An unknown error occurred');
            }
        }
        return undefined;
    };

    const createNewDocument = async (document: Document) => {
        try {
            const newDocument = await createDocument(document);
            setDocuments([...documents, { ...document, idDocument: newDocument.idDocument }]);
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError('An unknown error occurred');
            }
        }
    };

    const updateExistingDocument = async (id: number, document: Document) => {
        try {
            await updateDocument(id, document);
            setDocuments(documents.map(d => (d.idDocument === id ? { ...d, ...document } : d)));
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError('An unknown error occurred');
            }
        }
    };

    const deleteExistingDocument = async (id: number) => {
        try {
            await deleteDocument(id);
            setDocuments(documents.filter(d => d.idDocument !== id));
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError('An unknown error occurred');
            }
        }
    };

    const fetchDocumentsByStepProcedureId = async (idStepProcedure: number) => {
        try {
            const documentsByStep = await getDocumentsByStepProcedureId(idStepProcedure);
            setDocuments(documentsByStep);
            return documentsByStep;
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError('An unknown error occurred');
            }
        }
    };

    return { setDocuments, documents, loading, error, fetchDocumentById, createNewDocument,
        updateExistingDocument, deleteExistingDocument, fetchDocumentsByStepProcedureId };
};
