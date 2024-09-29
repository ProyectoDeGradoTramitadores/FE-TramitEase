import {
    Stepper,
    Step,
    StepLabel,
    Button,
    Stack,
    CircularProgress,
    Alert,
    Box,
    Typography, FormControlLabel, RadioGroup, FormLabel, FormControl, Radio,
} from '@mui/material';
import { IDS } from '../../shared/constants/routes.ts';
import useProgressClientLogic from '../../shared/hooks/useProgressClientLogic.ts';
import ColorlibStepIcon from '../../shared/components/stepperIcons/CustomStepIcons.tsx';
import { ColorlibConnector, RedStepIcon } from '../../shared/components/stepperIcons/CustomStepIcons.styles.ts';

const ProgressClientPage = () => {
    const idCLientFOlder = IDS().CLIENT_FOLDER_ID;
    const {
        activeStep,
        proceduresClient,
        activeStepProcedure,
        procedureNames,
        procedureDetails,
        handleBackProcedure,
        handleStatusChange,
        handleNextProcedure,
        handleNext,
        handleBack,
        stepProcedures,
        loading,
        error
    } = useProgressClientLogic(idCLientFOlder);


    if (loading) {
        return <CircularProgress />;
    }

    if (error) {
        return <Alert severity="error">{error}</Alert>;
    }

    return (
        <div>
            <Typography variant="h4">Progreso de los Procedimientos</Typography>

            <Stack sx={{ width: '100%' }} spacing={4}>
                <Stepper activeStep={activeStep} alternativeLabel>
                    {proceduresClient.map((stepProcedure, index) => (
                        <Step key={stepProcedure.idProcedureFolderClient}>
                            <StepLabel
                                StepIconComponent={() => (
                                    <RedStepIcon>{activeStep > index ? '✔' : index + 1}</RedStepIcon>
                                )}
                            >
                                {procedureNames[index] || 'Loading...'}
                            </StepLabel>
                        </Step>
                    ))}
                </Stepper>

                {activeStep < procedureDetails.length && (
                    <Box sx={{ mt: 2 }}>
                        <Typography variant="h6">{procedureDetails[activeStep].name}</Typography>
                        <Typography variant="body1">Descripción: {procedureDetails[activeStep].description}</Typography>
                        <Typography variant="body1">Dia de Inicio: {procedureDetails[activeStep].startDate}</Typography>
                        <Typography variant="body1">
                            Dia estimado: {procedureDetails[activeStep].estimatedDate}
                        </Typography>
                        <Typography variant="body1">
                            Duración: {procedureDetails[activeStep].durationDays} days
                        </Typography>
                            <Typography variant="body1">Estado: {procedureDetails[activeStep].status}</Typography>
                        <div>
                            <Typography variant="h4">Pasos de los procedimientos</Typography>
                            <Stack sx={{ width: '100%' }} spacing={4}>
                                <Stepper
                                    alternativeLabel
                                    activeStep={activeStepProcedure}
                                    connector={<ColorlibConnector />}
                                >
                                    {stepProcedures[activeStep]?.map((stepProcedure) => (
                                        <Step key={stepProcedure?.idStep}>
                                            <StepLabel StepIconComponent={ColorlibStepIcon}>
                                                {stepProcedure.name || 'Loading...'}
                                            </StepLabel>
                                        </Step>
                                    )) || 'Loading...'}
                                </Stepper>
                                {activeStepProcedure < stepProcedures[activeStep].length && (
                                    <Box sx={{ mt: 2 }}>
                                        <Typography variant="h6">{stepProcedures[activeStep][activeStepProcedure].name}</Typography>
                                        <Typography variant="body1">Requerimientos: {stepProcedures[activeStep][activeStepProcedure].requeriments}</Typography>
                                        <Typography variant="body1">Dia de Inicio: {stepProcedures[activeStep][activeStepProcedure].startDate}</Typography>
                                        <Typography variant="body1">
                                            Dia  de Finalización: {stepProcedures[activeStep][activeStepProcedure].endDate}
                                        </Typography>
                                        <Typography variant="body1">
                                            Dia estimado de Finalización: {stepProcedures[activeStep][activeStepProcedure].estimate}
                                        </Typography>
                                        <Typography variant="body1">
                                            Dias de Duración: {stepProcedures[activeStep][activeStepProcedure].dayDuRING} days
                                        </Typography>
                                        <FormControl component="fieldset">
                                            <FormLabel component="legend">Estado del paso</FormLabel>
                                            <RadioGroup
                                                row
                                                aria-label="status"
                                                name="status"
                                                value={stepProcedures[activeStep][activeStepProcedure].isComplete ? "Complete" : "InProgress"}
                                                onChange={(e) =>
                                                    handleStatusChange(
                                                        stepProcedures[activeStep][activeStepProcedure].idStep,
                                                        e.target.value === "Complete"
                                                    )
                                                }
                                            >
                                                <FormControlLabel value="InProgress" control={<Radio />} label="En progreso" />
                                                <FormControlLabel value="Complete" control={<Radio />} label="Completado" />
                                            </RadioGroup>

                                        </FormControl>
                                    </Box>
                                )}
                                <div>
                                    <Button
                                        disabled={activeStepProcedure === 0}
                                        onClick={handleBackProcedure}
                                    >
                                        Back
                                    </Button>
                                    <Button
                                        variant="contained"
                                        onClick={handleNextProcedure}
                                        disabled={
                                            !stepProcedures[activeStep] ||
                                            activeStepProcedure === stepProcedures[activeStep].length - 1
                                        }
                                    >
                                        Next
                                    </Button>
                                </div>
                            </Stack>
                        </div>
                    </Box>
                )}

                <div>
                    <Button disabled={activeStep === 0} onClick={handleBack}>
                        Back
                    </Button>
                    <Button
                        variant="contained"
                        onClick={handleNext}
                        disabled={activeStep === proceduresClient.length - 1}
                    >
                        Next
                    </Button>
                </div>
            </Stack>
        </div>
    );
};

export default ProgressClientPage;
