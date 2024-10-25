import { useEffect, useState } from 'react';
import { useProcedureFolderClients } from './useProcedureFolderClient.ts';
import { useStepProcedureFolderClients } from './useStepProcedureFolderClients.ts';
import { useProcedures } from './useProcedures.ts';
import { Document } from '../../entities/Document.ts';
import { useStepProcedures } from './useStepProcedures.ts';
import { ProcedureFolderClient } from '../../entities/ProcedureFolderClient.ts';
import { StepProcedureFolderClient } from '../../entities/StepProcedureFolderClient.ts';
import { useDocuments } from './useDocuments.ts';
import { ProcedureClient } from '../../entities/ProcedureClient.ts';
import { ProcedureStepData } from '../../entities/ProcedureStepData.tsx';
import { useClientFolders } from './useClientFolders.ts';

const useProgressClientLogic = (idClientFolder: string | number) => {
    const [openModal, setOpenModal] = useState(false);
    const [newDataStep, setNewData] = useState<StepProcedureFolderClient>();
    const [activeStep, setActiveStep] = useState(0);
    const [isChecked, setIsChecked] = useState(false);
    const [activeStepProcedure, setActiveStepProcedure] = useState(0);
    const [procedureNames, setProcedureNames] = useState<string[]>([]);
    const [stepProcedures, setStepProcedures] = useState<Map<number, ProcedureStepData[]>>(new Map());
    const [stepProcedureFirst, setStepProcedureFirst] = useState<StepProcedureFolderClient>();
    const [procedureDetails, setProcedureDetails] = useState<ProcedureClient[]>([]);
    const { loading, error, fetchProcedureFolderClientsByClientFolderId,
        updateExistingProcedureFolderClient } = useProcedureFolderClients();
    const { fetchProcedureById } = useProcedures();
    const {updateExistingClientFolder, fetchClientFolderById} = useClientFolders()
    const { fetchStepProcedureFolderClientsByProcedureFolderClientId,
        updateExistingStepProcedureFolderClient} = useStepProcedureFolderClients();
    const { fetchStepProcedureById } = useStepProcedures();
    const { createNewDocument } = useDocuments();
    const [proceduresClient, setProceduresClient] = useState<ProcedureFolderClient[]>([]);

    const handleSaveComment = async (comment: string) => {

        if(newDataStep){
            await updateExistingStepProcedureFolderClient(newDataStep.idStepProcedureFolderClient, {...newDataStep, commentsDelay: comment})
            console.log('Comentario guardado:', newDataStep);
        }

        setOpenModal(false);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
    };

    const createDocument = async (document: Document) => {
        try {
            await createNewDocument(document);
        } catch (err) {
            if (err instanceof Error) {
                console.log(err.message);
            } else {
                console.log('An unknown error occurred');
            }
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchProcedureFolderClientsByClientFolderId(Number(idClientFolder || ''));
                const sortedProceduresClient = data?.sort((a, b) =>
                    a.idProcedureFolderClient - b.idProcedureFolderClient
                );
                setProceduresClient(sortedProceduresClient ?? []);
            } catch (err) {
                console.error('Error fetching data:', err);
            }
        };

        if (idClientFolder) {
            fetchData();
        }
    }, [idClientFolder, fetchProcedureFolderClientsByClientFolderId]);

    const calculateEstimatedDate = (startDate: string | Date, durationDays: number) => {
        if (!startDate || isNaN(new Date(startDate).getTime())) {
            return 'N/A';
        }
        const start = new Date(startDate);
        const estimatedDate = new Date(start);
        estimatedDate.setDate(start.getDate() + durationDays);
        return estimatedDate.toISOString().split('T')[0];
    };

    const findNextInProgressProcedure = () => {
        for (let i = activeStep + 1; i < procedureDetails.length; i++) {
            if (procedureDetails[i].status === 'En progreso') {
                return activeStep +1;
            }
        }
        return -1;
    };

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    useEffect(() => {
        const fetchProcedureNames = async () => {
            if (proceduresClient.length > 0) {
                proceduresClient?.sort((a, b) => (a.idProcedureFolderClient ?? 0) - (b.idProcedureFolderClient ?? 0));

                try {
                    const details: ProcedureClient[] = await Promise.all(
                        proceduresClient.map(async (procedureClient, index) => {
                            const procedure = await fetchProcedureById(procedureClient.idProcedure);
                            const estimatedDate = calculateEstimatedDate(
                                procedureClient?.startDate ?? '',
                                procedure?.dayDuring ?? 0
                            );


                            const stepsProcedu = await fetchStepProcedureFolderClientsByProcedureFolderClientId(
                                procedureClient?.idProcedureFolderClient
                            );

                            stepsProcedu?.sort((a, b) => (a.idStepProcedureFolderClient ?? 0) - (b.idStepProcedureFolderClient ?? 0));

                            if(index == 0 && stepsProcedu){
                                setStepProcedureFirst(stepsProcedu[0]);
                            }

                            const detailsStep: ProcedureStepData[] = await Promise.all(
                                (stepsProcedu ?? []).map(async (stepProc) => {
                                    const procStep = await fetchStepProcedureById(stepProc.idStepProcedure);

                                    const estimatedDateStep = calculateEstimatedDate(
                                        stepProc?.startDate ?? '',
                                        procStep?.dayDuring ?? 0
                                    );
                                    return {
                                        idStepProc: String(stepProc.idStepProcedureFolderClient),
                                        idProcedure: String(stepProc.idProcedureFolderClient),
                                        idStep: String(stepProc.idStepProcedure),
                                        name: procStep?.nameStep,
                                        requirements: procStep?.requirements,
                                        startDate: stepProc?.startDate?.toString(),
                                        endDate: stepProc?.endDate?.toString(),
                                        estimate: estimatedDateStep,
                                        dayDuring: procStep?.dayDuring,
                                        isComplete: stepProc.isComplete,
                                        commentsDelay: stepProc.commentsDelay,
                                    };
                                })
                            );
                            detailsStep.sort((a, b) => Number(a.idStep) - Number(b.idStep));
                            setStepProcedures((prevMap) => {
                                const newMap = new Map(prevMap);
                                newMap.set(procedureClient.idProcedureFolderClient, detailsStep);
                                return newMap;
                            });
                            return {
                                id: procedureClient.idProcedureFolderClient,
                                name: procedure?.name ?? '',
                                description: procedure?.description ?? '',
                                startDate: procedureClient?.startDate?.toString() ?? 'N/A',
                                endDate: procedureClient.endDate?.toString() ?? 'N/A',
                                estimatedDate: estimatedDate,
                                durationDays: procedure?.dayDuring ?? 0,
                                status: procedureClient?.isComplete ? 'Completado' : 'En progreso',
                            };
                        })
                    );
                    details.sort((a, b) => a.id - b.id);
                    setProcedureNames(details.map((detail) => detail.name));
                    setProcedureDetails(details);
                } catch (err) {
                    console.error('Error fetching procedure names:', err);
                }
            }
        };

        if (proceduresClient.length > 0) {
            fetchProcedureNames();
        }
    }, [proceduresClient, fetchProcedureById]);

    useEffect(() => {
        const setInitialSteps = () => {
            for (let i = 0; i < procedureDetails.length; i++) {
                console.log(procedureDetails);
                if(procedureDetails.length - 1 == i && procedureDetails[i].status === 'Completado'){
                    setActiveStep(i);
                }
                if (procedureDetails[i].status === 'En progreso') {
                    setActiveStep(i);
                    for (let j = 0; j < (stepProcedures.get(procedureDetails[i].id)?.length?? 0); j++) {
                        if ((stepProcedures.get(procedureDetails[i].id)?.[j].isComplete) ===  false) {
                            setActiveStepProcedure(j);
                            return;
                        }
                    }
                    return;
                }
            }
        };

        setInitialSteps();
    }, [procedureDetails]);

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleNextProcedure = () => {
        setActiveStepProcedure((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBackProcedure = () => {
        setActiveStepProcedure((prevActiveStep) => prevActiveStep - 1);
    };

    const handleStatusChange = async (stepId: number, newStatus: boolean) => {
        try {
            const currentProcedureSteps = stepProcedures.get(procedureDetails[activeStep].id) ?? [];
            const stepIndex = currentProcedureSteps.findIndex(step => Number(step.idStepProc) === stepId);
            const currentStep = currentProcedureSteps[stepIndex];
            const newData: StepProcedureFolderClient = {
                idStepProcedureFolderClient: Number(currentStep.idStepProc),
                idProcedureFolderClient: Number(currentStep.idProcedure),
                idStepProcedure: Number(currentStep.idStep),
                isComplete: newStatus,
                endDate: new Date().toISOString(),
                startDate: currentStep.startDate,
            };

            setNewData(newData);

            await updateExistingStepProcedureFolderClient(Number(currentStep.idStepProc), newData);

            if((stepIndex + 1) < currentProcedureSteps.length) {
                const currentSte = currentProcedureSteps[stepIndex + 1];
                const nextData: StepProcedureFolderClient = {
                    idStepProcedureFolderClient: Number(currentSte.idStepProc),
                    idProcedureFolderClient: Number(currentSte.idProcedure),
                    idStepProcedure: Number(currentSte.idStep),
                    isComplete: false,
                    endDate: null,
                    startDate: new Date(),
                };

                await updateExistingStepProcedureFolderClient(Number(currentSte.idStepProc), nextData);
            }

            const updatedSteps : ProcedureStepData[] = currentProcedureSteps.map((step, index) => {
                if (index === stepIndex) {
                    return { ...step, isComplete: newStatus };
                }else if(index === (stepIndex + 1)) {
                    const estimatedDateStep = calculateEstimatedDate(
                        step?.startDate ?? '',
                        step?.dayDuring ?? 0
                    );

                    return { ...step, isComplete: false, startDate: new Date().toString(), estimatedDate: estimatedDateStep };
                }
                return step;
            });
            setStepProcedures((prevStepProcedures) => {
                const updatedMap = new Map(prevStepProcedures);
                updatedMap.set(activeStepProcedure, updatedSteps);
                return updatedMap;
            });

            const allStepsComplete = updatedSteps.every(step => step.isComplete);

            if (allStepsComplete) {
                setProcedureDetails((prevDetails) => {
                    const updatedDetails = [...prevDetails];
                    updatedDetails[activeStep] = {
                        ...updatedDetails[activeStep],
                        status: newStatus? 'Completado' : 'En progreso',
                    };
                    return updatedDetails;
                });

                const nextProcedureIndex = findNextInProgressProcedure();
                const currentProcedure = proceduresClient[activeStep];
                const updateData: ProcedureFolderClient = {
                    ...currentProcedure,
                    isComplete: true,
                    endDate: new Date(),
                };

                await updateExistingProcedureFolderClient(currentProcedure.idProcedureFolderClient, updateData);

                if(nextProcedureIndex != -1){
                    const nextProcedure = proceduresClient[nextProcedureIndex];

                    const newData: ProcedureFolderClient = {
                        ...nextProcedure,
                        isComplete: false,
                        startDate: new Date(),
                    };

                    await updateExistingProcedureFolderClient(nextProcedure?.idProcedureFolderClient, newData);

                    const currentProcedureSteps = stepProcedures.get(nextProcedure.idProcedureFolderClient) ?? [];

                    const currentStep = currentProcedureSteps[0];

                    const newDataStep: StepProcedureFolderClient = {
                        idStepProcedureFolderClient: Number(currentStep.idStepProc),
                        idProcedureFolderClient: Number(currentStep.idProcedure),
                        idStepProcedure: Number(currentStep.idStep),
                        isComplete: false,
                        endDate: null,
                        startDate: new Date(),
                    };
                    await updateExistingStepProcedureFolderClient(Number(currentStep.idStepProc), newDataStep);
                }else {
                    const clientfolder = await fetchClientFolderById(Number(idClientFolder));
                    if(clientfolder){
                        await updateExistingClientFolder(Number(idClientFolder),
                            {...clientfolder, endDate: (new Date()).toISOString()})

                    }
                    setActiveStep(0);
                }

                if (nextProcedureIndex !== -1 && nextProcedureIndex < proceduresClient.length - 1) {
                    const updatedProcedureData: ProcedureFolderClient = {
                        ...proceduresClient[activeStep],
                        isComplete: true,
                        endDate: new Date(),
                    };
                    await updateExistingProcedureFolderClient(updatedProcedureData.idProcedureFolderClient, updatedProcedureData);

                    setActiveStep(nextProcedureIndex);
                    setActiveStepProcedure(0);

                }

                if(stepProcedureFirst){
                    await updateExistingStepProcedureFolderClient((stepProcedureFirst?.idStepProcedureFolderClient) ?? 0,
                        {
                            ...stepProcedureFirst,
                            startDate: new Date()
                        }
                    );
                }
            }else {
                handleNextProcedure();
            }

            if(newStatus){
                setOpenModal(true);
            }
        } catch (err) {
            console.error('Error changing status:', err);
        }
    };

    const handleCheckboxChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const checked = event.target.checked;
        setIsChecked(checked);

        if (checked) {
            const clientfolder = await fetchClientFolderById(Number(idClientFolder));

            if (clientfolder) {
                await updateExistingClientFolder(Number(idClientFolder), { ...clientfolder,
                    creationDate: (new Date()).toISOString() });

                await updateExistingProcedureFolderClient(proceduresClient[0].idProcedureFolderClient,
                    {...proceduresClient[0], startDate: new Date()});

                if(stepProcedureFirst){
                    await updateExistingStepProcedureFolderClient((stepProcedureFirst?.idStepProcedureFolderClient) ?? 0,
                        {
                            ...stepProcedureFirst,
                            startDate: new Date()
                        }
                    );
                }
            }
        }
    };

    return {
        loading,
        error,
        activeStep,
        activeStepProcedure,
        procedureNames,
        stepProcedures,
        isChecked,
        procedureDetails,
        proceduresClient,
        stepProcedureFirst,
        openModal,
        handleCheckboxChange,
        createDocument,
        handleBack,
        handleSaveComment,
        handleCloseModal,
        handleStatusChange,
        handleNext,
        handleNextProcedure,
        handleBackProcedure,
    };
};

export default useProgressClientLogic;
