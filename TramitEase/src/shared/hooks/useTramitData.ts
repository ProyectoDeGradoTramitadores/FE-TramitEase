import { useState } from 'react';
import {Tramit } from '../../entities/Tramit.ts';
import { useTypeTramits } from './useTypeTramits.ts';
import { useProcedures } from './useProcedures.ts';
import { useTramits } from './useTramits.ts';
import { useStepProcedures } from './useStepProcedures.ts';
import { useTramitProcedures } from './useTramitProcedures.ts';
import { TypeTramit } from '../../entities/TypeTramit.ts';
import { Procedure } from '../../entities/Procedure.ts';
import { StepProcedure } from '../../entities/StepProcedure.ts';

export const useTramitData = () => {
    const { fetchTramitById } = useTramits();
    const { fetchTypeTramitById } = useTypeTramits();
    const { fetchTramitProceduresByTramitId } = useTramitProcedures();
    const { fetchProcedureById } = useProcedures();
    const { fetchStepProceduresByProcedureId } = useStepProcedures();

    const [tramit, setTramit] = useState<Tramit | null>(null);
    const [typeTramit, setTypeTramit] = useState<TypeTramit | null>(null);
    const [procedures, setProcedures] = useState<Procedure[]>([]);
    const [proceduresWithSteps, setProceduresWithSteps] = useState<Map<number, StepProcedure[]>>(new Map());

    const fetchTramitData = async (idTramit: number) => {
        const tramitData = await fetchTramitById(idTramit);
        const tramitTypeData = await fetchTypeTramitById(idTramit);
        const tramitProcedures = await fetchTramitProceduresByTramitId(idTramit);

        if (tramitProcedures) {
            const proceduresPromises = tramitProcedures.map(async (procedure) => {
                const obtainProcedure = await fetchProcedureById(procedure.idProcedure);
                return obtainProcedure;
            });

            const proceduresResults = await Promise.all(proceduresPromises);
            const filteredProcedures = proceduresResults.filter((p): p is Procedure => p !== undefined);
            setProcedures(filteredProcedures);

            const stepsPromises = filteredProcedures.map(async (procedure) => {
                const stepProcedures = await fetchStepProceduresByProcedureId(procedure.idProcedure || 0);
                return [procedure.idProcedure, stepProcedures] as [number, StepProcedure[]];
            });

            const stepsResults = await Promise.all(stepsPromises);
            const stepsMap = new Map<number, StepProcedure[]>(stepsResults);
            setProceduresWithSteps(stepsMap);
        }

        setTypeTramit(tramitTypeData || null);
        setTramit(tramitData || null);
    };

    return {
        tramit,
        typeTramit,
        procedures,
        proceduresWithSteps,
        fetchTramitData
    };
};
