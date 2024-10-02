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

const useProgressClientLogic = (idClientFolder: string | number) => {
    const [activeStep, setActiveStep] = useState(0);
    const [activeStepProcedure, setActiveStepProcedure] = useState(0);
    const [procedureNames, setProcedureNames] = useState<string[]>([]);
    const [stepProcedures, setStepProcedures] = useState<ProcedureStepData[][]>([]);
    const [procedureDetails, setProcedureDetails] = useState<ProcedureClient[]>([]);
    const { loading, error, fetchProcedureFolderClientsByClientFolderId,
        updateExistingProcedureFolderClient } = useProcedureFolderClients();
    const { fetchProcedureById } = useProcedures();
    const { fetchStepProcedureFolderClientsByProcedureFolderClientId,
        updateExistingStepProcedureFolderClient } = useStepProcedureFolderClients();
    const { fetchStepProcedureById } = useStepProcedures();
    const { createNewDocument } = useDocuments();
    const [proceduresClient, setProceduresClient] = useState<ProcedureFolderClient[]>([]);

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
                setProceduresClient(data ?? []);
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
            if ( procedureDetails[i].status === 'En progreso') {
                return i;
            }
        }
        return -1;
    };

    const handleNext = () => {
        if (procedureDetails[activeStep].status === 'Completado') {
            const nextInProgress = findNextInProgressProcedure();
            if (nextInProgress !== -1) {
                setActiveStep(nextInProgress);
            }
        } else {
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
        }
    };

    useEffect(() => {
        const fetchProcedureNames = async () => {
            if (proceduresClient.length > 0) {
                try {
                    const details = await Promise.all(
                        proceduresClient.map(async (procedureClient) => {
                            const procedure = await fetchProcedureById(procedureClient.idProcedure);
                            const estimatedDate = calculateEstimatedDate(
                                procedureClient?.startDate ?? '',
                                procedure?.dayDuring ?? 0
                            );
                            const stepsProcedu = await fetchStepProcedureFolderClientsByProcedureFolderClientId(
                                procedureClient?.idProcedureFolderClient
                            );

                            const detailsStep = await Promise.all(
                                (stepsProcedu ?? []).map(async (stepProc) => {
                                    const procStep = await fetchStepProcedureById(stepProc.idStepProcedure);

                                    const estimatedDateStep = calculateEstimatedDate(
                                        stepProc?.startDate ?? '',
                                        procStep?.dayDuring ?? 0
                                    );


                                    return {
                                        idStepProc: stepProc.idStepProcedureFolderClient,
                                        idProcedure: stepProc.idProcedureFolderClient,
                                        idStep: stepProc.idStepProcedure,
                                        name: procStep?.nameStep,
                                        requeriments: procStep?.requirements,
                                        startDate: stepProc?.startDate,
                                        endDate: stepProc?.endDate,
                                        estimate: estimatedDateStep,
                                        dayDuRING: procStep?.dayDuring,
                                        isComplete: stepProc.isComplete,
                                    };
                                })
                            );

                            setStepProcedures((prevState) => [...prevState, detailsStep]);
                            return {
                                name: procedure?.name ?? '',
                                description: procedure?.description ?? '',
                                startDate: procedureClient?.startDate ?? 'N/A',
                                endDate: procedureClient.endDate ?? 'N/A',
                                estimatedDate: estimatedDate,
                                durationDays: procedure?.dayDuring ?? 0,
                                status: procedureClient?.isComplete ? 'Completado' : 'En progreso',
                            };
                        })
                    );
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
        setActiveStepProcedure(0);
    }, [activeStep]);

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
            const updatedSteps = await Promise.all(
                stepProcedures[activeStep].map(async (step) => {
                    if (step.idStep === stepId) {
                        const newData: StepProcedureFolderClient = {
                            idStepProcedureFolderClient: step.idStepProc,
                            idProcedureFolderClient: step.idProcedure,
                            idStepProcedure: step.idStep,
                            isComplete: newStatus,
                            endDate: new Date().toISOString(),
                            startDate: step.startDate,
                        };
                        await updateExistingStepProcedureFolderClient(step.idStepProc, newData);
                        return { ...step, isComplete: newStatus };
                    }
                    return step;
                })
            );

            setStepProcedures((prevStepProcedures) => {
                const updatedStepProcedures = [...prevStepProcedures];
                updatedStepProcedures[activeStep] = updatedSteps;
                return updatedStepProcedures;
            });

            const allStepsComplete = updatedSteps.every(step => step.isComplete);

            if (allStepsComplete) {
                const nextProcedureIndex = findNextInProgressProcedure();

                // Check if the next procedure index is valid
                if (nextProcedureIndex !== -1 && nextProcedureIndex < proceduresClient.length) {
                    const updatedProcedureData: ProcedureFolderClient = {
                        ...proceduresClient[activeStep],
                        isComplete: true,
                        endDate: new Date(),
                    };
                    await updateExistingProcedureFolderClient(updatedProcedureData.idProcedureFolderClient, updatedProcedureData);

                    const updateNextProcedureData: ProcedureFolderClient = {
                        ...proceduresClient[nextProcedureIndex],
                        isComplete: false,
                        startDate: new Date(),
                    };
                    await updateExistingProcedureFolderClient(updateNextProcedureData.idProcedureFolderClient, updateNextProcedureData);

                    const nextSteps = stepProcedures[nextProcedureIndex];
                    if (nextSteps.length > 0 && activeStepProcedure === 0) {
                        const updatedNextSteps = await Promise.all(
                            nextSteps.map(async (nextStep) => {
                                const newData: StepProcedureFolderClient = {
                                    idStepProcedureFolderClient: nextStep.idStepProc,
                                    idProcedureFolderClient: nextStep.idProcedure,
                                    idStepProcedure: nextStep.idStep,
                                    isComplete: false,
                                    endDate: null,
                                    startDate: new Date().toISOString(),
                                };
                                await updateExistingStepProcedureFolderClient(Number(nextStep.idStepProc), newData);
                                return newData;
                            })
                        );
                        setStepProcedures((prevStepProcedures) => {
                            const updatedStepProcedures = [...prevStepProcedures];
                            updatedStepProcedures[nextProcedureIndex] = updatedNextSteps;
                            return updatedStepProcedures;
                        });
                    }

                    setActiveStep(nextProcedureIndex);
                } else {
                    console.log("No more procedures in progress or already on the last procedure.");
                }
            }
        } catch (error) {
            console.error('Error updating step status:', error);
        }
    };

    return {
        activeStep,
        setActiveStep,
        activeStepProcedure,
        proceduresClient,
        createDocument,
        setActiveStepProcedure,
        procedureNames,
        procedureDetails,
        handleBack,
        handleNext,
        handleNextProcedure,
        handleStatusChange,
        handleBackProcedure,
        stepProcedures,
        loading,
        error
    };
};

export default useProgressClientLogic;
