import { useEffect, useState } from 'react';
import { Tramit } from '../../entities/Tramit.ts';
import { Procedure } from '../../entities/Procedure.ts';
import { TramitProcedure } from '../../entities/TramitProcedure.ts';
import { StepProcedure } from '../../entities/StepProcedure.ts';
import { IDS, ROUTES } from '../constants/routes.ts';
import { ProcedureForm, Step } from '../types/FormComponentProps.ts';
import { useTramits } from './useTramits.ts';
import { useProcedures } from './useProcedures.ts';
import { useTramitProcedures } from './useTramitProcedures.ts';
import { useStepProcedures } from './useStepProcedures.ts';
import { useNavigate } from 'react-router-dom';
import { SelectChangeEvent } from '@mui/material';

const useTramitCreate = () => {
    const [procedures, setProcedures] = useState<ProcedureForm[]>([]);
    const [tramitId, setTramitId] = useState<string>('');
    const [name, setName] = useState<string>('');
    const [isExistingProcedure, setIsExistingProcedure] = useState(false);
    const [selectedType, setSelectedType] = useState<string>('');
    const [existingTramit, setExistingTramit] = useState<Tramit | null>(null);
    const [openModal, setOpenModal] = useState(false);
    const [openSelectModal, setOpenSelectModal] = useState(false);
    const [selectedProcedure, setselectedProcedure] = useState<number | null>(null);
    const id = IDS().TRAMITADOR_ID;
    const idTramit = IDS().TRAMIT_ID;
    const navigate = useNavigate()

    const { createNewTramit, updateExistingTramit, fetchTramitById } = useTramits();
    const { createNewTramitProcedure, fetchTramitProceduresByTramitId } = useTramitProcedures();
    const { createNewStepProcedure, fetchStepProceduresByProcedureId,
        updateExistingStepProcedure } = useStepProcedures();
    const { fetchProceduresByTramitadorId, procedures: tramitadorProcedures,
        loading, createNewProcedure, updateExistingProcedure } = useProcedures();

    useEffect(() => {
        if (idTramit !== '' && idTramit) {
            fetchTramitById(parseInt(idTramit)).then((tramit) => {
                if (tramit) {
                    setExistingTramit(tramit);
                    setTramitId(tramit.idTramit.toString());
                    setName(tramit?.name || '');
                    setSelectedType(tramit.idTypeTramit.toString());
                    fetchTramitProceduresByTramitId(tramit.idTramit).then(tramitProcedures => {
                        const procedurePromises = (tramitProcedures || []).map(async (tramitProcedure) => {
                            const procedure = tramitadorProcedures.find(p => p.idProcedure === tramitProcedure.idProcedure);
                            if (procedure) {
                                const steps = await fetchStepProceduresByProcedureId(procedure.idProcedure);
                                const mappedSteps: Step[] = (steps || []).map((step) => ({
                                    idStepProcedure: step.idProcedure,
                                    name: step?.nameStep || '',
                                    requirements: step?.requirements || '',
                                    days: typeof step?.dayDuring === 'number' ? step.dayDuring : Number(step?.dayDuring) || 0,
                                }));

                                return {
                                    name: procedure.name || '',
                                    description: procedure.description || '',
                                    steps: mappedSteps
                                };
                            }
                            return null;
                        });

                        Promise.all(procedurePromises).then(results => {
                            setProcedures(results.filter(p => p !== null) as ProcedureForm[]);
                        });
                    });
                }
            });
        } else {
            fetchProceduresByTramitadorId(parseInt(id));
        }
    }, [idTramit, tramitadorProcedures]);

    const handleOpenModal = () => {
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
    };

    const handleAddNewProcedure = () => {
        handleCloseModal();
        handleAddProcedure();
        setIsExistingProcedure(false);
    };

    const handleUseExistingProcedure = () => {
        handleCloseModal();
        setOpenSelectModal(true);
        setIsExistingProcedure(true);
    };

    const handleSelectProcedure = async (event: SelectChangeEvent<number>) => {
        const procedureId = event.target.value as number;
        setselectedProcedure(procedureId);

        const selectedProc = tramitadorProcedures.find(p => p.idProcedure === procedureId);

        const steps = await fetchStepProceduresByProcedureId(procedureId);

        const mappedSteps: Step[] = steps?.map((step) => ({
            idStepProcedure: step.idProcedure,
            name: step?.nameStep || '',
            requirements: step?.requirements || '',
            days: typeof step?.dayDuring === 'number' ? step.dayDuring : Number(step?.dayDuring) || 0,
        })) || [];

        const procedureForm: ProcedureForm = {
            id: selectedProc?.idProcedure || 0,
            name: selectedProc?.name || '',
            description: selectedProc?.description || '',
            steps: mappedSteps
        };

        handleAddProcedure(procedureForm);
        setselectedProcedure(null);
        setOpenSelectModal(false);
    };

    const handleAddProcedure = (procedure?: ProcedureForm) => {
        if (procedure) {
            setProcedures([...procedures, procedure]);
        } else {
            setProcedures([...procedures, { name: '', description: '', steps: [] }]);
        }
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
                dayDuring: existingTramit?.dayDuring || 0,
            };

            var tramitNewCreate;

            if (existingTramit) {
                tramitNewCreate = await updateExistingTramit(newTramit.idTramit, newTramit);
            } else {
                tramitNewCreate = await createNewTramit(newTramit);
            }

            if (procedures.length > 0) {
                for (const procedure of procedures) {
                    if(procedure.id){
                        const exampleTramitProcedure: TramitProcedure = {
                            idTramitProcedure: 0,
                            idTramit: tramitNewCreate?.idTramit || 0,
                            idProcedure: procedure.id|| 0
                        };

                        await createNewTramitProcedure(exampleTramitProcedure);
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
                        }
                    }else {
                        const newProcedure: Procedure = {
                            idProcedure: 0,
                            name: procedure.name,
                            description: procedure.description,
                            idTramitador: parseInt(id),
                            dayDuring: 0,
                        };

                        var dayStepProcedure = 0;

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
        id,
        tramitId,
        name,
        selectedType,
        openModal,
        openSelectModal,
        loading,
        selectedProcedure: selectedProcedure,
        tramitadorProcedures,
        isExistingProcedure,
        handleOpenModal,
        handleCloseModal,
        handleAddNewProcedure,
        handleUseExistingProcedure,
        handleSelectProcedure,
        setTramitId,
        setName,
        setSelectedType,
        handleAddProcedure,
        handleProcedureChange,
        handleRemoveProcedure,
        setOpenSelectModal,
        handleSubmit
    };
};

export default useTramitCreate;
