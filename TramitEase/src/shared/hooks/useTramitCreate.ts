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
    const [procedureTramitador, setProcedureTramitador] = useState<Procedure[]>([]);
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
    const { fetchProceduresByTramitadorId,
        loading, createNewProcedure, updateExistingProcedure, fetchProcedureById } = useProcedures();

    useEffect(() => {
        const fetchData = async () => {
            if (idTramit !== '' && idTramit) {
                try {
                    const tramit = await fetchTramitById(parseInt(idTramit));
                    if (tramit) {
                        setExistingTramit(tramit);
                        setTramitId(tramit.idTramit.toString());
                        setName(tramit?.name ?? '');
                        setSelectedType(tramit.idTypeTramit.toString());

                        const tramitProcedures = await fetchTramitProceduresByTramitId(tramit.idTramit);
                        const procedurePromises = (tramitProcedures ?? []).map(async (tramitProcedure) => {
                            if (tramitProcedure) {
                                const procedure = await fetchProcedureById(tramitProcedure.idProcedure)
                                const steps = await fetchStepProceduresByProcedureId(tramitProcedure.idProcedure);
                                const mappedSteps: Step[] = (steps ?? []).map((step) => ({
                                    idStepProcedure: step.idProcedure,
                                    name: step?.nameStep ?? '',
                                    requirements: step?.requirements ?? '',
                                    days: typeof step?.dayDuring === 'number' ? step.dayDuring : Number(step?.dayDuring) || 0,
                                }));

                                return {
                                    id: procedure?.idProcedure,
                                    name: procedure?.name ?? '',
                                    description: procedure?.description ?? 'No tiene descripcion',
                                    steps: mappedSteps
                                };
                            }
                            return null;
                        });

                        const results = await Promise.all(procedurePromises);
                        setProcedures(results.filter(p => p !== null) as ProcedureForm[]);
                    }
                } catch (error) {
                    console.error("Error fetching tramit or its procedures:", error);
                }
            }

            try {
                const procedures = await fetchProceduresByTramitadorId(parseInt(id));
                setProcedureTramitador(procedures ?? []);
            } catch (error) {
                console.error("Error fetching procedures by tramitador ID:", error);
            }
        };

        fetchData();
    }, [idTramit]);

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

        const selectedProc = procedureTramitador.find(p => p.idProcedure === procedureId);

        const steps = await fetchStepProceduresByProcedureId(procedureId);

        const mappedSteps: Step[] = steps?.map((step) => ({
            idStepProcedure: step.idStepProcedure,
            name: step?.nameStep ?? '',
            requirements: step?.requirements ?? '',
            days: typeof step?.dayDuring === 'number' ? step.dayDuring : Number(step?.dayDuring) || 0,
        })) ?? [];

        const procedureForm: ProcedureForm = {
            id: selectedProc?.idProcedure ?? 0,
            name: selectedProc?.name ?? '',
            description: selectedProc?.description ?? '',
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
        let dayStepProcedure;
        try {
            let days = 0;

            const newTramit: Tramit = {
                idTramit: parseInt(tramitId) || 0,
                idTypeTramit: parseInt(selectedType),
                idTramitador: parseInt(id),
                name: name,
                dayDuring: existingTramit?.dayDuring ?? 0,
            };

            let tramitNewCreate;

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
                            idTramit: tramitNewCreate?.idTramit ?? 0,
                            idProcedure: procedure.id ?? 0
                        };

                        await createNewTramitProcedure(exampleTramitProcedure);
                        dayStepProcedure = 0;

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

                        dayStepProcedure = 0;

                        const procedureCreate = await createNewProcedure(newProcedure);

                        const exampleTramitProcedure: TramitProcedure = {
                            idTramitProcedure: 0,
                            idTramit: tramitNewCreate?.idTramit ?? 0,
                            idProcedure: procedureCreate?.idProcedure ?? 0
                        };

                        await createNewTramitProcedure(exampleTramitProcedure);

                        if (procedure.steps.length > 0) {
                            for (const step of procedure.steps) {
                                const createStepProcedure: StepProcedure = {
                                    idStepProcedure: 0,
                                    idProcedure: procedureCreate?.idProcedure ?? 0,
                                    nameStep: step.name,
                                    requirements: step.requirements,
                                    dayDuring: step.days
                                };
                                await createNewStepProcedure(createStepProcedure);
                                dayStepProcedure += step.days;
                                days += step.days;
                            }
                            await updateExistingProcedure((procedureCreate?.idProcedure ?? 0) , {
                                idProcedure: procedureCreate?.idProcedure ?? 0,
                                name: procedureCreate?.name,
                                description: procedureCreate?.description,
                                idTramitador: parseInt(id),
                                dayDuring: dayStepProcedure,
                            } as Procedure);
                        }
                    }
                    await updateExistingTramit( (tramitNewCreate?.idTramit ?? newTramit.idTramit), {
                        ...newTramit,
                        idTramit: tramitNewCreate?.idTramit ?? newTramit.idTramit,
                        dayDuring: days,
                    });
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
        procedureTramitador,
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
