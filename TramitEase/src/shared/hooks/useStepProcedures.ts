import { useEffect, useState } from 'react';
import { StepProcedure } from '../../entities/StepProcedure.ts';
import { createStepProcedure,
    deleteStepProcedure,
    getStepProcedureById,
    getStepProcedures,
    updateStepProcedure,
    getStepProceduresByProcedureId } from '../services/procedure/StepProcedureService.ts';

export const useStepProcedures = () => {
    const [stepProcedures, setStepProcedures] = useState<StepProcedure[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchStepProcedures = async () => {
            try {
                const data = await getStepProcedures();
                setStepProcedures(data);
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

        fetchStepProcedures();
    }, []);

    const fetchStepProcedureById = async (id: number): Promise<StepProcedure | undefined> => {
        try {
            const stepProcedure = await getStepProcedureById(id);
            return stepProcedure;
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError('An unknown error occurred');
            }
        }
        return undefined;
    };

    const fetchStepProceduresByProcedureId = async (procedureId: number): Promise<StepProcedure[] | undefined>  => {
        try {
            const data = await getStepProceduresByProcedureId(procedureId);
            return data;
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError('An unknown error occurred');
            }
        }
    };

    const createNewStepProcedure = async (stepProcedure: StepProcedure) => {
        try {
            const newStepProcedure = await createStepProcedure(stepProcedure);
            if (newStepProcedure) {
                setStepProcedures([...stepProcedures, newStepProcedure]);
            }
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError('An unknown error occurred');
            }
        }
    };

    const updateExistingStepProcedure = async (id: number, stepProcedure: StepProcedure) => {
        try {
            await updateStepProcedure(id, stepProcedure);
            setStepProcedures(stepProcedures.map(sp => (sp.idStepProcedure === id ? stepProcedure : sp)));
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError('An unknown error occurred');
            }
        }
    };

    const deleteExistingStepProcedure = async (id: number) => {
        try {
            await deleteStepProcedure(id);
            setStepProcedures(stepProcedures.filter(sp => sp.idStepProcedure !== id));
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError('An unknown error occurred');
            }
        }
    };

    return {
        stepProcedures,
        loading,
        error,
        fetchStepProcedureById,
        fetchStepProceduresByProcedureId,
        createNewStepProcedure,
        updateExistingStepProcedure,
        deleteExistingStepProcedure
    };
};
