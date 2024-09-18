import { useEffect, useState } from 'react';
import { Procedure } from '../../entities/Procedure.ts';
import { StepProcedure } from '../../entities/StepProcedure.ts';
import { IDS, ROUTES } from '../constants/routes.ts';
import { ProcedureForm, Step } from '../types/FormComponentProps.ts';
import { useProcedures } from './useProcedures.ts';
import { useStepProcedures } from './useStepProcedures.ts';
import { useNavigate } from 'react-router-dom';

const useProcedureCreate = () => {
    const [procedure, setProcedure] = useState<ProcedureForm | null >(null);
    const [openSelectModal, setOpenSelectModal] = useState(false);
    const id = IDS().TRAMITADOR_ID;
    const idProcedure = IDS().PROCEDURE_ID;
    const navigate = useNavigate()

    const { createNewStepProcedure, fetchStepProceduresByProcedureId,
        updateExistingStepProcedure } = useStepProcedures();
    const { createNewProcedure, updateExistingProcedure, fetchProcedureById } = useProcedures();

    useEffect(() => {
        if (idProcedure !== '' && idProcedure) {
            fetchProcedureById(parseInt(idProcedure)).then(async (procedure) => {
                if (procedure) {
                    const steps = await fetchStepProceduresByProcedureId(procedure.idProcedure);
                    const mappedSteps: Step[] = (steps || []).map((step) => ({
                        idStepProcedure: step.idProcedure,
                        name: step?.nameStep || '',
                        requirements: step?.requirements || '',
                        days: typeof step?.dayDuring === 'number' ? step.dayDuring : Number(step?.dayDuring) || 0,
                    }));

                    setProcedure({
                        name: procedure.name || '',
                        description: procedure.description || '',
                        steps: mappedSteps
                    })
                }
            });
        }else {
            setProcedure({
                name: '',
                description: '',
                steps: []
            })
        }
    }, [idProcedure]);

    const handleAddProcedure = (procedure?: ProcedureForm) => {
        if (procedure) {
            setProcedure(procedure);
        }
    };

    const handleSubmit = async () => {
        try {
            var days = 0;

            if(procedure){
                if (idProcedure !== '' && idProcedure) {
                    var dayStepProcedure = 0;

                    for (const step of procedure.steps) {
                        if (step.idStepProcedure) {
                            const updateStepProc: StepProcedure = {
                                idStepProcedure: step.idStepProcedure,
                                idProcedure: procedure.id || 0,
                                nameStep: step.name,
                                requirements: step.requirements,
                                dayDuring: step.days
                            };

                            await updateExistingStepProcedure(step.idStepProcedure, updateStepProc);
                            days += step.days;
                            dayStepProcedure += step.days;
                        } else {
                            const newStepProcedure: StepProcedure = {
                                idStepProcedure: 0,
                                idProcedure: procedure.id || 0,
                                nameStep: step.name,
                                requirements: step.requirements,
                                dayDuring: step.days
                            };
                            await createNewStepProcedure(newStepProcedure);
                            days += step.days;
                            dayStepProcedure += step.days;
                        }

                        const newProcedure: Procedure = {
                            idProcedure: procedure.id || 0,
                            name: procedure.name,
                            description: procedure.description,
                            idTramitador: parseInt(id),
                            dayDuring: dayStepProcedure,
                        };

                        await updateExistingProcedure((procedure.id || 0), newProcedure);
                        console.log("procedure update");
                    }
                } else {
                    const newProcedure: Procedure = {
                        idProcedure: 0,
                        name: procedure?.name,
                        description: procedure?.description,
                        idTramitador: parseInt(id),
                        dayDuring: 0,
                    };

                    var dayStepProcedure = 0;

                    const procedureCreate = await createNewProcedure(newProcedure);

                    if (procedure.steps.length > 0) {
                        for (const step of procedure.steps) {
                            const createStepProcedure: StepProcedure = {
                                idStepProcedure: 0,
                                idProcedure: procedureCreate?.idProcedure || 0,
                                nameStep: step.name,
                                requirements: step.requirements,
                                dayDuring: step.days
                            };
                            await createNewStepProcedure(createStepProcedure);
                            dayStepProcedure += step.days;
                            days += step.days;
                        }
                        await updateExistingProcedure((procedureCreate?.idProcedure || 0) , {
                            idProcedure: procedureCreate?.idProcedure || 0,
                            name: procedureCreate?.name,
                            description: procedureCreate?.description,
                            idTramitador: parseInt(id),
                            dayDuring: dayStepProcedure,
                        } as Procedure);
                    }
                }
            }
            navigate(ROUTES.TRAMITS_CUSTOM(id));
        } catch (error) {
            console.error('Error al crear el trámite:', error);
        }
    };

    return {
        procedure,
        id,
        openSelectModal,
        handleAddProcedure,
        setOpenSelectModal,
        handleSubmit
    };
};

export default useProcedureCreate;
