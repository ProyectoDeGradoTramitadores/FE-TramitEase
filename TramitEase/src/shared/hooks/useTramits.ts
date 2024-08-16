import { useEffect, useState } from 'react';
import {
    getTramits,
    getTramitById,
    createTramit,
    updateTramit,
    deleteTramit,
    getTramitsByTypeId, getTramitsByTramitadorId,
} from '../services/tramit/TramitService.ts';
import { Tramit } from '../../entities/Tramit.ts';

export const useTramits = () => {
    const [tramits, setTramits] = useState<Tramit[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchTramits = async () => {
            try {
                const data = await getTramits();
                setTramits(data);
                setLoading(false);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An unknown error occurred');
                setLoading(false);
            }
        };

        fetchTramits();
    }, []);

    const fetchTramitById = async (id: number): Promise<Tramit | undefined> => {
        try {
            return await getTramitById(id);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An unknown error occurred');
            return undefined;
        }
    };

    const fetchTramitsByTypeId = async (typeId: number): Promise<Tramit[]> => {
        try {
            return await getTramitsByTypeId(typeId);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An unknown error occurred');
            return [];
        }
    };

    const fetchTramitsByTramitadorId = async (typeId: number): Promise<Tramit[]> => {
        try {
            return await  getTramitsByTramitadorId(typeId);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An unknown error occurred');
            return [];
        }
    };

    const createNewTramit = async (tramit: Tramit) => {
        try {
            await createTramit(tramit);
            setTramits([...tramits, tramit]);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An unknown error occurred');
        }
    };

    const updateExistingTramit = async (id: number, tramit: Tramit) => {
        try {
            await updateTramit(id, tramit);
            setTramits(tramits.map(t => (t.idTramit === id ? tramit : t)));
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An unknown error occurred');
        }
    };

    const deleteExistingTramit = async (id: number) => {
        try {
            await deleteTramit(id);
            setTramits(tramits.filter(t => t.idTramit !== id));
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An unknown error occurred');
        }
    };

    return { tramits, loading, error, fetchTramitById, fetchTramitsByTypeId, createNewTramit, updateExistingTramit, deleteExistingTramit, fetchTramitsByTramitadorId };
};
