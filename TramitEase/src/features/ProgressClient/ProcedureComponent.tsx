import {
    Stepper,
    Step,
    StepLabel,
    Stack,
    CircularProgress,
    Alert,
    Box,
    Typography, FormControlLabel, RadioGroup, FormLabel, FormControl, Radio,
} from '@mui/material';
import { IDS } from '../../shared/constants/routes.ts';
import useProgressClientLogic from '../../shared/hooks/useProgressClientLogic.ts';
import ColorlibStepIcon from '../../shared/components/stepperIcons/CustomStepIcons.tsx';
import { ColorlibConnector } from '../../shared/components/stepperIcons/CustomStepIcons.styles.ts';
import DocumentsList from '../../features/ClientFolder/DocumentsList.tsx';
import StepperProcedure from './StepperProcedure.tsx';
import DataProcedure from './DataProcedure.tsx';
import StepProcedureData from './StepPorcedureData.tsx';
import CustomButton from '../../shared/components/buttons/CustomButton.tsx';

const ProcedureComponent = () => {
    const idCLientFOlder = IDS().CLIENT_FOLDER_ID;
    const {
        activeStep,
        proceduresClient,
        activeStepProcedure,
        procedureDetails,
        handleBackProcedure,
        handleStatusChange,
        handleNextProcedure,
        handleNext,
        handleBack,
        createDocument,
        stepProcedures,
        loading,
        error
    } = useProgressClientLogic(idCLientFOlder);


    if (loading) {
        return (
            <Box sx={{ minWidth: "1805px", minHeight: "1500px", display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return <Alert severity="error">{error}</Alert>;
    }

    return (
        <Stack sx={{ width: '100%', minWidth: "1805px", minHeight: "700px" }} spacing={4}>
            <StepperProcedure idFolderClient={idCLientFOlder} />
            {activeStep < procedureDetails.length && (
                <Box sx={{
                    mt: 2, display: 'flex',
                    flexDirection: 'column', gap: "33px"
                }}>
                    <DataProcedure Status={procedureDetails[activeStep].status}
                                   name={procedureDetails[activeStep].name}
                                   description={procedureDetails[activeStep].description}
                                   initialDay={procedureDetails[activeStep].startDate}
                                   estimateDay={procedureDetails[activeStep].estimatedDate}
                                   durationDays={String(procedureDetails[activeStep].durationDays)} />
                    <div>
                        <Typography variant="h4">Pasos de los procedimientos</Typography>
                        <Stack sx={{ width: '100%' }} spacing={4}>
                            <Stepper
                                alternativeLabel
                                activeStep={activeStepProcedure}
                                connector={<ColorlibConnector />}
                            >
                                {stepProcedures.get(procedureDetails[activeStep].id)?.map((stepProcedure) => (
                                    <Step key={stepProcedure?.idStep}>
                                        <StepLabel StepIconComponent={ColorlibStepIcon}>
                                            {stepProcedure.name ?? 'Loading...'}
                                        </StepLabel>
                                    </Step>
                                )) ?? 'Loading...'}
                            </Stepper>
                            {activeStepProcedure < (stepProcedures.get(procedureDetails[activeStep].id)?.length ?? 0) && (
                                <Box sx={{
                                    mt: 2,
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    flexDirection: 'column',
                                    gap: 3
                                }}>
                                    <StepProcedureData
                                        name={stepProcedures.get(procedureDetails[activeStep].id)?.[activeStepProcedure]?.name ?? ''}
                                        estimate={stepProcedures.get(procedureDetails[activeStep].id)?.[activeStepProcedure]?.estimate ?? ''}
                                        endDate={stepProcedures.get(procedureDetails[activeStep].id)?.[activeStepProcedure]?.endDate}
                                        startDate={stepProcedures.get(procedureDetails[activeStep].id)?.[activeStepProcedure]?.startDate}
                                        dayDuRING={stepProcedures.get(procedureDetails[activeStep].id)?.[activeStepProcedure]?.dayDuring}
                                        requeriments={stepProcedures.get(procedureDetails[activeStep].id)?.[activeStepProcedure]?.requirements}
                                    />
                                    <FormControl component="fieldset">
                                        <FormLabel component="legend">Estado del paso</FormLabel>
                                        <RadioGroup
                                            row
                                            aria-label="status"
                                            name="status"
                                            value={stepProcedures.get(procedureDetails[activeStep].id)?.[activeStepProcedure]?.isComplete ? 'Complete' : 'InProgress'}
                                            onChange={(e) =>
                                                handleStatusChange(
                                                    Number(stepProcedures.get(procedureDetails[activeStep].id)?.[activeStepProcedure]?.idStepProc),
                                                    e.target.value === 'Complete',
                                                )
                                            }
                                        >
                                            <FormControlLabel value="InProgress" control={<Radio />} label="En progreso" />
                                            <FormControlLabel value="Complete" control={<Radio />} label="Completado" />
                                        </RadioGroup>
                                    </FormControl>
                                    <div style={{ display: 'flex', gap: '23px' }}>
                                        <CustomButton
                                            onClick={handleBackProcedure}
                                            $textStyle={'bold'}
                                            $text={'anterior Paso'}
                                            disabled={activeStepProcedure === 0}
                                            size={'s'}
                                            color={'primary'}
                                        />
                                        <CustomButton
                                            disabled={(stepProcedures.get(procedureDetails[activeStep].id)?.
                                                length ?? 1 - 1) === activeStep}
                                            onClick={handleNextProcedure}
                                            $textStyle={'bold'}
                                            $text={'Siguiente Paso'}
                                            size={'s'}
                                            color={'secondary'}
                                        />
                                    </div>
                                </Box>
                            )}
                            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '34px' }}>
                                <Typography variant="h6">Documentos</Typography>
                                <DocumentsList
                                    idStepProcedureClientFolder={Number(stepProcedures?.get(procedureDetails[activeStep].id)?.
                                        [activeStepProcedure]?.idStepProc)}
                                    onDocumentSelect={createDocument}
                                />
                            </Box>
                        </Stack>
                    </div>
                </Box>
            )}
            <div style={{ display: 'flex', gap: '23px', justifyContent: 'flex-end' }}>
                <CustomButton disabled={activeStep === 0} onClick={handleBack} $textStyle={'bold'}
                              $text={'Anterior Procedimiento'} size={'s'} color={'primary'} />
                <CustomButton onClick={handleNext} $textStyle={'bold'}
                              $text={'Siguiente Procedimiento'} size={'s'} color={'ternary'}
                              disabled={activeStep === proceduresClient.length - 1} />

            </div>
        </Stack>
    );
};

export default ProcedureComponent;