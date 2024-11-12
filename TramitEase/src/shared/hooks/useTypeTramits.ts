import { useEffect, useState } from 'react';
import {
    getTypeTramits,
    getTypeTramitById,
    createTypeTramit,
    updateTypeTramit,
    deleteTypeTramit,
    getTypeTramitsByTramitadorId,
} from '../services/tramit/TypeTramit.ts';
import { TypeTramit } from '../../entities/TypeTramit.ts';

export const useTypeTramits = () => {
    const [typeTramits, setTypeTramits] = useState<TypeTramit[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const refreshTypeTramits = async () => {
        setLoading(true);
        try {
            const data = await getTypeTramits();
            setTypeTramits(data);
            setLoading(false);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An unknown error occurred');
            setLoading(false);
        }
    };

    useEffect(() => {
        refreshTypeTramits();
    }, []);

    const fetchTypeTramitById = async (id: number): Promise<TypeTramit | undefined> => {
        try {
            return await getTypeTramitById(id);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An unknown error occurred');
            return undefined;
        }
    };

    const fetchTypeTramitsByTramitadorId = async (idTramitador: number): Promise<TypeTramit[]> => {
        try {
            return await getTypeTramitsByTramitadorId(idTramitador);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An unknown error occurred');
            return [];
        }
    };

    const createNewTypeTramit = async (typeTramit: TypeTramit) => {
        try {
            await createTypeTramit(typeTramit);
            await refreshTypeTramits();
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An unknown error occurred');
        }
    };

    const updateExistingTypeTramit = async (id: number, typeTramit: TypeTramit) => {
        try {
            await updateTypeTramit(id, typeTramit);
            await refreshTypeTramits();
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An unknown error occurred');
        }
    };

    const deleteExistingTypeTramit = async (id: number) => {
        try {
            await deleteTypeTramit(id);
            await refreshTypeTramits();
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An unknown error occurred');
        }
    };

    return {
        typeTramits,
        loading,
        error,
        fetchTypeTramitsByTramitadorId,
        fetchTypeTramitById,
        createNewTypeTramit,
        updateExistingTypeTramit,
        deleteExistingTypeTramit,
        refreshTypeTramits
    };
};
