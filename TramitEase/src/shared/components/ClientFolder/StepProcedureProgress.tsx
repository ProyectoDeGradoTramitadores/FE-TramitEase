import { Button, Box, Typography, Stepper, Step, StepLabel } from '@mui/material';
import { StepProcedureProgressProps } from '../../types/ClientFolderProps.ts';

const StepProcedureProgress = ({
                                   activeStepProcedure,
                                   stepProcedures,
                                   handleNextProcedure,
                                   handleBackProcedure
                               }: StepProcedureProgressProps) => (
    <div>
        <Stepper alternativeLabel activeStep={activeStepProcedure}>
            {stepProcedures.map((stepGroup) =>
                stepGroup.map((stepProcedure) => (
                    <Step key={stepProcedure.idStep}>
                        <StepLabel>{stepProcedure.name || 'Loading...'}</StepLabel>
                    </Step>
                ))
            )}
        </Stepper>

        {stepProcedures.length > 0 && (
            <Box sx={{ mt: 2 }}>
                <Typography variant="h6">
                    {stepProcedures[activeStepProcedure]?.[0]?.name || 'Loading...'}
                </Typography>
                <Typography variant="body1">
                    Requerimientos: {stepProcedures[activeStepProcedure]?.[0]?.requeriments || 'N/A'}
                </Typography>
                <Typography variant="body1">
                    Día de Inicio: {stepProcedures[activeStepProcedure]?.[0]?.startDate || 'N/A'}
                </Typography>
                <Typography variant="body1">
                    Día estimado de Finalización: {stepProcedures[activeStepProcedure]?.[0]?.endDate || 'N/A'}
                </Typography>
                <Typography variant="body1">
                    Días de Duración: {stepProcedures[activeStepProcedure]?.[0]?.dayDuRING || 'N/A'} days
                </Typography>
                <Typography variant="body1">
                    Estado: {stepProcedures[activeStepProcedure]?.[0]?.isComplete ? "Completado" : "En progreso"}
                </Typography>
            </Box>
        )}

        <div>
            <Button disabled={activeStepProcedure === 0} onClick={handleBackProcedure}>
                Back
            </Button>
            <Button
                variant="contained"
                onClick={handleNextProcedure}
                disabled={activeStepProcedure === stepProcedures.length - 1}
            >
                Next
            </Button>
        </div>
    </div>
);

export default StepProcedureProgress;
