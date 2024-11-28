import { useEffect, useState } from 'react';
import { Tramitador } from '../../entities/Tramitador';
import {
    createTramitador,
    deleteTramitador,
    getTramitadorById,
    getTramitadores,
    updateTramitador,
} from '../services/tramitador/TramitadorService';

export const useTramitadores = () => {
    const [tramitadores, setTramitadores] = useState<Tramitador[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchTramitadores = async () => {
            try {
                const data = await getTramitadores();
                setTramitadores(data);
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

        fetchTramitadores();
    }, []);

    const fetchTramitadorById = async (id: number): Promise<Tramitador | undefined> => {
        try {
            const tramitador = await getTramitadorById(id);
            return tramitador;
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError('An unknown error occurred');
            }
        }
        return undefined;
    };

    const createNewTramitador = async (tramitador: Tramitador): Promise<Tramitador | undefined> => {
        try {
            const newTramitador = await createTramitador(tramitador);
            if (newTramitador != null) {
                setTramitadores([...tramitadores, newTramitador]);
            }
            return newTramitador;
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError('An unknown error occurred');
            }
        }
    };

    const updateExistingTramitador = async (id: number, tramitador: Tramitador) => {
        try {
            await updateTramitador(id, tramitador);
            setTramitadores(tramitadores.map(t => (t.idTramitador === id ? tramitador : t)));
            return tramitador;
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError('An unknown error occurred');
            }
        }
    };

    const deleteExistingTramitador = async (id: number) => {
        try {
            await deleteTramitador(id);
            setTramitadores(tramitadores.filter(t => t.idTramitador !== id));
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError('An unknown error occurred');
            }
        }
    };

    return { tramitadores, loading, error, fetchTramitadorById, createNewTramitador, updateExistingTramitador, deleteExistingTramitador };
};
