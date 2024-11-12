import { useState } from 'react';
import { useProcedures } from './useProcedures.ts';
import { useStepProcedures } from './useStepProcedures.ts';
import { Procedure } from '../../entities/Procedure.ts';
import { StepProcedure } from '../../entities/StepProcedure.ts';

export const useProcedureData = () => {
    const { fetchProcedureById } = useProcedures();
    const { fetchStepProceduresByProcedureId } = useStepProcedures();
    const [procedure, setProcedure] = useState<Procedure>();
    const [procedureWithSteps, setProcedureWithSteps] = useState<StepProcedure[]>([]);

    const fetchProcedureData = async (idProcedure: number) => {
        const obtainProcedure = await fetchProcedureById(idProcedure);
        if (obtainProcedure) {
            setProcedure(obtainProcedure);
            const stepProcedures = await fetchStepProceduresByProcedureId(idProcedure || 0);
            if (stepProcedures) {
                setProcedureWithSteps(stepProcedures);

            }
        }
    };

    return {
        procedure, procedureWithSteps, fetchProcedureData
    };
};
