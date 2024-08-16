import { useEffect, useState } from 'react';
import { Procedure } from '../../entities/Procedure.ts';
import {
    createProcedure,
    deleteProcedure,
    getProcedureById,
    getProcedures,
    updateProcedure,
    checkProcedureExists,
}
 from '../services/procedure/ProcedureService.ts';

export const useProcedures = () => {
    const [procedures, setProcedures] = useState<Procedure[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProcedures = async () => {
            try {
                const data = await getProcedures();
                setProcedures(data);
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

        fetchProcedures().then(r => console.log(r));
    }, []);

    const fetchProcedureById = async (id: number): Promise<Procedure | undefined> => {
        try {
            const procedure = await getProcedureById(id);
            return procedure;
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError('An unknown error occurred');
            }
        }
        return undefined;
    };

    const checkProcedureExistsAndFetch = async (id: number): Promise<Procedure | null> => {
        try {
            const exists = await checkProcedureExists(id);
            if (exists) {
                const procedure = await getProcedureById(id);
                return procedure;
            }
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError('An unknown error occurred');
            }
        }
        return null;
    };

    const createNewProcedure = async (procedure: Procedure) => {
        try {
            const newProcedure = await createProcedure(procedure);
            if (newProcedure != null) {
                setProcedures([...procedures, newProcedure]);
            }
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError('An unknown error occurred');
            }
        }
    };

    const updateExistingProcedure = async (id: number, procedure: Procedure) => {
        try {
            await updateProcedure(id, procedure);
            setProcedures(procedures.map(t => (t.idProcedure === id ? procedure : t)));
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError('An unknown error occurred');
            }
        }
    };

    const deleteExistingProcedure = async (id: number) => {
        try {
            await deleteProcedure(id);
            setProcedures(procedures.filter(t => t.idProcedure !== id));
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError('An unknown error occurred');
            }
        }
    };

    return { procedures, loading, error, fetchProcedureById, createNewProcedure, updateExistingProcedure, deleteExistingProcedure, checkProcedureExistsAndFetch };
};