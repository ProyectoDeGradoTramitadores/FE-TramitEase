import { useEffect, useState } from 'react';
import {
    getTypeTramits,
    getTypeTramitById,
    createTypeTramit,
    updateTypeTramit,
    deleteTypeTramit
} from '../services/tramit/TypeTramit.ts';
import { TypeTramit } from '../../entities/TypeTramit.ts';

export const useTypeTramits = () => {
    const [typeTramits, setTypeTramits] = useState<TypeTramit[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchTypeTramits = async () => {
            try {
                const data = await getTypeTramits();
                setTypeTramits(data);
                setLoading(false);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An unknown error occurred');
                setLoading(false);
            }
        };

        fetchTypeTramits();
    }, []);

    const fetchTypeTramitById = async (id: number): Promise<TypeTramit | undefined> => {
        try {
            return await getTypeTramitById(id);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An unknown error occurred');
            return undefined;
        }
    };

    const createNewTypeTramit = async (typeTramit: TypeTramit) => {
        try {
            await createTypeTramit(typeTramit);
            setTypeTramits([...typeTramits, typeTramit]);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An unknown error occurred');
        }
    };

    const updateExistingTypeTramit = async (id: number, typeTramit: TypeTramit) => {
        try {
            await updateTypeTramit(id, typeTramit);
            setTypeTramits(typeTramits.map(t => (t.idTypeTramit === id ? typeTramit : t)));
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An unknown error occurred');
        }
    };

    const deleteExistingTypeTramit = async (id: number) => {
        try {
            await deleteTypeTramit(id);
            setTypeTramits(typeTramits.filter(t => t.idTypeTramit !== id));
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An unknown error occurred');
        }
    };

    return { typeTramits, loading, error, fetchTypeTramitById, createNewTypeTramit, updateExistingTypeTramit, deleteExistingTypeTramit };
};
