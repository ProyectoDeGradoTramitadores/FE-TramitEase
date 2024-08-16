import { useEffect, useState } from 'react';
import { ProcedureTramit } from '../../entities/ProcedureTramit.ts';
import {
    createProcedureTramitador,
    deleteProcedureTramitador,
    getProcedureTramitadorById,
    getProcedureTramitadors,
    updateProcedureTramitador,
    checkProcedureTramitadorExists,
    getProcedureTramitadorsByTramitadorId,
    getProcedureTramitadorsByProcedureId
}  from '../services/procedure/ProcedureTramitadorService.ts';

export const useProcedureTramitadors = () => {
    const [procedureTramitadors, setProcedureTramitadors] = useState<ProcedureTramit[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProcedureTramitadors = async () => {
            try {
                const data = await getProcedureTramitadors();
                setProcedureTramitadors(data);
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

        fetchProcedureTramitadors();
    }, []);

    const fetchProcedureTramitadorById = async (id: number): Promise<ProcedureTramit | undefined> => {
        try {
            const procedureTramitador = await getProcedureTramitadorById(id);
            return procedureTramitador;
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError('An unknown error occurred');
            }
        }
        return undefined;
    };

    const checkProcedureTramitadorExistsAndFetch = async (id: number): Promise<ProcedureTramit | null> => {
        try {
            const exists = await checkProcedureTramitadorExists(id);
            if (exists) {
                const procedureTramitador = await getProcedureTramitadorById(id);
                return procedureTramitador;
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

    const createNewProcedureTramitador = async (procedureTramitador: ProcedureTramit) => {
        try {
            await createProcedureTramitador(procedureTramitador);
            setProcedureTramitadors([...procedureTramitadors, procedureTramitador]);
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError('An unknown error occurred');
            }
        }
    };

    const updateExistingProcedureTramitador = async (id: number, procedureTramitador: ProcedureTramit) => {
        try {
            await updateProcedureTramitador(id, procedureTramitador);
            setProcedureTramitadors(procedureTramitadors.map(p => (p.idProcedureTramitador === id ? procedureTramitador : p)));
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError('An unknown error occurred');
            }
        }
    };

    const deleteExistingProcedureTramitador = async (id: number) => {
        try {
            await deleteProcedureTramitador(id);
            setProcedureTramitadors(procedureTramitadors.filter(p => p.idProcedureTramitador !== id));
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError('An unknown error occurred');
            }
        }
    };

    const fetchProcedureTramitadorsByTramitadorId = async (idTramitador: number): Promise<ProcedureTramit[]> => {
        try {
            const data = await getProcedureTramitadorsByTramitadorId(idTramitador);
            return data;
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError('An unknown error occurred');
            }
            return [];
        }
    };

    const fetchProcedureTramitadorsByProcedureId = async (idProcedure: number): Promise<ProcedureTramit[]> => {
        try {
            const data = await getProcedureTramitadorsByProcedureId(idProcedure);
            return data;
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError('An unknown error occurred');
            }
            return [];
        }
    };

    return { procedureTramitadors, loading, error, fetchProcedureTramitadorById, createNewProcedureTramitador, updateExistingProcedureTramitador, deleteExistingProcedureTramitador, checkProcedureTramitadorExistsAndFetch, fetchProcedureTramitadorsByTramitadorId, fetchProcedureTramitadorsByProcedureId };
};
