import { useNavigate } from 'react-router-dom';
import { useTramits } from './useTramits.ts';
import { useTramitProcedures } from './useTramitProcedures.ts';
import { useProcedures } from './useProcedures.ts';
import { useStepProcedures } from './useStepProcedures.ts';
import { ProcedureForm, Step } from '../types/FormComponentProps.ts';
import { IDS, ROUTES } from '../constants/routes.ts';
import { Tramit } from '../../entities/Tramit.ts';

export const useTramitHandlers = (procedures: ProcedureForm[], isExistingProcedure: boolean, selectedProcedure: number | null, name: string, selectedType: string) => {
    const { createNewTramit, updateExistingTramit } = useTramits();
    const { createNewTramitProcedure } = useTramitProcedures();
    const { createNewStepProcedure, updateExistingStepProcedure } = useStepProcedures();
    const { createNewProcedure, updateExistingProcedure } = useProcedures();

    const navigate = useNavigate();
    const id = IDS().TRAMITADOR_ID;
    const idTramit = IDS().TRAMIT_ID;

    const createOrUpdateTramit = async (newTramit: Tramit): Promise<Tramit || undefined> => {
        if (idTramit !== '') {
            return updateExistingTramit(parseInt(idTramit), newTramit);
        }
        return createNewTramit(newTramit);
    };

    const handleSubmit = async (tramitId: string) => {
        try {
            let totalDays = 0;
            const tramit: Tramit = {
                idTramit: parseInt(tramitId) || 0,
                idTypeTramit: parseInt(selectedType),
                idTramitador: parseInt(id),
                name: name,
                dayDuring: 0,
            };

            const newTramit = await createOrUpdateTramit(tramit);

            for (const procedure of procedures) {
                if (isExistingProcedure) {
                    await handleExistingProcedure(newTramit, procedure);
                } else {
                    await handleNewProcedure(newTramit, procedure);
                }
            }

            navigate(ROUTES.TRAMITS_CUSTOM(id));
        } catch (error) {
            console.error('Error al crear el trámite:', error);
        }
    };

    const handleExistingProcedure = async (newTramit: Tramit, procedure: ProcedureForm) => {
        if (!selectedProcedure) return;

        const tramitProcedure: TramitProcedure = {
            idTramitProcedure: 0,
            idTramit: newTramit.idTramit,
            idProcedure: selectedProcedure,
        };
        await createNewTramitProcedure(tramitProcedure);

        for (const step of procedure.steps) {
            await handleStepProcedure(step, selectedProcedure);
        }

        await updateExistingProcedure(selectedProcedure, {
            idProcedure: selectedProcedure,
            name: procedure.name,
            description: procedure.description,
            idTramitador: parseInt(id),
        } as Procedure);
    };

    const handleNewProcedure = async (newTramit: Tramit, procedure: ProcedureForm) => {
        const newProcedure = await createNewProcedure({
            idProcedure: 0,
            name: procedure.name,
            description: procedure.description,
            idTramitador: parseInt(id),
        } as Procedure);

        const tramitProcedure: TramitProcedure = {
            idTramitProcedure: 0,
            idTramit: newTramit.idTramit,
            idProcedure: newProcedure.idProcedure,
        };
        await createNewTramitProcedure(tramitProcedure);

        for (const step of procedure.steps) {
            await handleStepProcedure(step, newProcedure.idProcedure);
        }

        await updateExistingProcedure(newProcedure.idProcedure, {
            idProcedure: newProcedure.idProcedure,
            name: newProcedure.name,
            description: newProcedure.description,
            idTramitador: parseInt(id),
            dayDuring: procedure.steps.reduce((sum, step) => sum + step.days, 0),
        } as Procedure);
    };

    const handleStepProcedure = async (step: Step, procedureId: number) => {
        if (step.idStepProcedure) {
            await updateExistingStepProcedure(step.idStepProcedure, {
                idStepProcedure: step.idStepProcedure,
                idProcedure: procedureId,
                nameStep: step.name,
                requirements: step.requirements,
                dayDuring: step.days,
            });
        } else {
            await createNewStepProcedure({
                idStepProcedure: 0,
                idProcedure: procedureId,
                nameStep: step.name,
                requirements: step.requirements,
                dayDuring: step.days,
            });
        }
    };

    return { handleSubmit };
};
