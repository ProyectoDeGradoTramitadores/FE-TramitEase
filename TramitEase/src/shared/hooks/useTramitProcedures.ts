import { useState, useEffect } from 'react';
import { TramitProcedure } from '../../entities/TramitProcedure.ts';
import { getTramitProcedureById,
    getAllTramitProcedures,
    getTramitProceduresByTramitId,
    getTramitProceduresByProcedureId,
    createTramitProcedure,
    updateTramitProcedure, deleteTramitProcedure
}from '../services/tramit/TramitProcedureService.ts';

export const useTramitProcedures = () => {
    const [tramitProcedures, setTramitProcedures] = useState<TramitProcedure[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchTramitProcedures = async () => {
        setLoading(true);
        try {
            const data = await getAllTramitProcedures();
            setTramitProcedures(data);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An unknown error occurred');
        } finally {
            setLoading(false);
        }
    };

    const fetchTramitProcedureById = async (id: number) => {
        setLoading(true);
        try {
            const data = await getTramitProcedureById(id);
            setTramitProcedures([data]);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An unknown error occurred');
        } finally {
            setLoading(false);
        }
    };

    const fetchTramitProceduresByTramitId = async (tramitId: number) : Promise<TramitProcedure[] | undefined> => {
        setLoading(true);
        try {
            return  await getTramitProceduresByTramitId(tramitId);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An unknown error occurred');
        } finally {
            setLoading(false);
        }
    };

    const fetchTramitProceduresByProcedureId = async (procedureId: number) => {
        setLoading(true);
        try {
            const data = await getTramitProceduresByProcedureId(procedureId);
            setTramitProcedures(data);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An unknown error occurred');
        } finally {
            setLoading(false);
        }
    };

    const createNewTramitProcedure = async (tramitProcedure: TramitProcedure) => {
        setLoading(true);
        try {
            await createTramitProcedure(tramitProcedure);
            await fetchTramitProcedures();
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An unknown error occurred');
        } finally {
            setLoading(false);
        }
    };

    const updateExistTramitProcedure = async (id: number, tramitProcedure: TramitProcedure) => {
        setLoading(true);
        try {
            await updateTramitProcedure(id, tramitProcedure);
            await fetchTramitProcedures();
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An unknown error occurred');
        } finally {
            setLoading(false);
        }
    };

    const deleteExistTramitProcedure = async (id: number) => {
        setLoading(true);
        try {
            await deleteTramitProcedure(id);
            await fetchTramitProcedures();
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An unknown error occurred');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTramitProcedures();
    }, []);

    return {
        tramitProcedures,
        loading,
        error,
        fetchTramitProcedureById,
        fetchTramitProceduresByTramitId,
        fetchTramitProceduresByProcedureId,
        createNewTramitProcedure,
        updateExistTramitProcedure,
        deleteExistTramitProcedure,
    };
};
