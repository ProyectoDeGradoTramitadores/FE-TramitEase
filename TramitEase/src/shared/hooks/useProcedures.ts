import { useEffect, useState, useCallback } from 'react';
import { Procedure } from '../../entities/Procedure.ts';
import {
    createProcedure, deleteProcedure, getProcedureById, getProcedures,
    updateProcedure, checkProcedureExists, getProceduresByTramitadorId
} from '../services/procedure/ProcedureService.ts';

export const useProcedures = () => {
    const [procedures, setProcedures] = useState<Procedure[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const handleError = (err: unknown) => {
        if (err instanceof Error) {
            setError(err.message);
        } else {
            setError('An unknown error occurred');
        }
        setLoading(false);
    };

    useEffect(() => {
        const fetchProcedures = async () => {
            try {
                const data = await getProcedures();
                setProcedures(data);
            } catch (err) {
                handleError(err);
            } finally {
                setLoading(false);
            }
        };
        fetchProcedures();
    }, []);

    const fetchProcedureById = useCallback(async (id: number) => {
        try {
            return await getProcedureById(id);
        } catch (err) {
            handleError(err);
        }
    }, []);

    const fetchProceduresByTramitadorId = useCallback(async (tramitadorId: number) => {
        try {
            const data = await getProceduresByTramitadorId(tramitadorId);
            setProcedures(data);
            return data;
        } catch (err) {
            handleError(err);
        }
    }, []);

    const createNewProcedure = useCallback(async (procedure: Procedure) => {
        try {
            const newProcedure = await createProcedure(procedure);
            setProcedures([...procedures, newProcedure]);
            return newProcedure;
        } catch (err) {
            handleError(err);
        }
    }, [procedures]);

    const updateExistingProcedure = useCallback(async (id: number, procedure: Procedure) => {
        try {
            await updateProcedure(id, procedure);
            setProcedures(procedures.map(t => t.idProcedure === id ? procedure : t));
            return procedure;
        } catch (err) {
            handleError(err);
        }
    }, [procedures]);

    const deleteExistingProcedure = useCallback(async (id: number) => {
        try {
            await deleteProcedure(id);
            setProcedures(procedures.filter(t => t.idProcedure !== id));
        } catch (err) {
            handleError(err);
        }
    }, [procedures]);

    return {
        procedures,
        loading,
        error,
        fetchProcedureById,
        fetchProceduresByTramitadorId,
        createNewProcedure,
        updateExistingProcedure,
        deleteExistingProcedure,
        checkProcedureExists
    };
};
