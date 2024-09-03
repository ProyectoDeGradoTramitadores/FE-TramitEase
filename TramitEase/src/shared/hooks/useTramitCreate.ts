import { useState } from 'react';
import { Tramit } from '../../entities/Tramit.ts';
import { Procedure } from '../../entities/Procedure.ts';
import { TramitProcedure } from '../../entities/TramitProcedure.ts';
import { StepProcedure } from '../../entities/StepProcedure.ts';
import { IDS, ROUTES } from '../constants/routes.ts';
import { ProcedureForm } from '../types/FormComponentProps.ts';
import { useTramits } from './useTramits.ts';
import { useProcedures } from './useProcedures.ts';
import { useTramitProcedures } from './useTramitProcedures.ts';
import { useStepProcedures } from './useStepProcedures.ts';
import { useNavigate } from 'react-router-dom';

const useTramitCreate = () => {
    const [procedures, setProcedures] = useState<ProcedureForm[]>([]);
    const [tramitId, setTramitId] = useState<string>('');
    const [name, setName] = useState<string>('');
    const [selectedType, setSelectedType] = useState<string>('');
    const id = IDS().TRAMITADOR_ID;
    const navigate = useNavigate()

    const { createNewTramit, updateExistingTramit } = useTramits();
    const { createNewProcedure, updateExistingProcedure } = useProcedures();
    const { createNewTramitProcedure } = useTramitProcedures();
    const { createNewStepProcedure } = useStepProcedures();

    const handleAddProcedure = () => {
        setProcedures([...procedures, { name: '', description: '', steps: [] }]);
    };

    const handleProcedureChange = (index: number, updatedProcedure: ProcedureForm) => {
        const updatedProcedures = [...procedures];
        updatedProcedures[index] = updatedProcedure;
        setProcedures(updatedProcedures);
    };

    const handleRemoveProcedure = (index: number) => {
        const updatedProcedures = procedures.filter((_, i) => i !== index);
        setProcedures(updatedProcedures);
    };

    const handleSubmit = async () => {
        try {
            var days = 0;

            const newTramit: Tramit = {
                idTramit: parseInt(tramitId) || 0,
                idTypeTramit: parseInt(selectedType),
                idTramitador: parseInt(id),
                name: name,
                dayDuring: 0
            };

            const tramitNewCreate = await createNewTramit(newTramit);

            if (procedures.length > 0) {
                for (const procedure of procedures) {
                    const newProcedure: Procedure = {
                        idProcedure: 0,
                        name: procedure.name,
                        description: procedure.description,
                        idTramitador: parseInt(id)
                    };

                    const procedureCreate = await createNewProcedure(newProcedure);

                    const exampleTramitProcedure: TramitProcedure = {
                        idTramitProcedure: 0,
                        idTramit: tramitNewCreate?.idTramit || 0,
                        idProcedure: procedureCreate?.idProcedure || 0
                    };

                    await createNewTramitProcedure(exampleTramitProcedure);

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

                            await updateExistingProcedure((procedureCreate?.idProcedure || 0) , {
                                idProcedure: procedureCreate?.idProcedure || 0,
                                name: procedureCreate?.name,
                                description: procedureCreate?.description,
                                idTramitador: parseInt(id),
                                dayDuring: (procedureCreate?.dayDuring|| 0) + step.days
                            } as Procedure);

                            days += step.days;
                        }
                    }

                    await updateExistingTramit( (tramitNewCreate?.idTramit || 0), {
                        idTramit: tramitNewCreate?.idTramit || 0,
                        idTypeTramit: tramitNewCreate?.idTypeTramit,
                        idTramitador: tramitNewCreate?.idTramitador,
                        name: tramitNewCreate?.name,
                        dayDuring: days,
                    } as Tramit);
                }
            }

            navigate(ROUTES.TRAMITS_CUSTOM(id));
        } catch (error) {
            console.error('Error al crear el trámite:', error);
        }
    };

    return {
        procedures,
        tramitId,
        name,
        selectedType,
        setTramitId,
        setName,
        setSelectedType,
        handleAddProcedure,
        handleProcedureChange,
        handleRemoveProcedure,
        handleSubmit
    };
};

export default useTramitCreate;
