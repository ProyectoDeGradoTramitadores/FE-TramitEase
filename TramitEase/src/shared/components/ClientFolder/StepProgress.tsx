import { Stepper, Step, StepLabel } from '@mui/material';
import { RedStepIcon } from '../stepperIcons/CustomStepIcons.styles.ts';
import { StepProgressProps } from '../../types/ClientFolderProps.ts';

const StepProgress = ({ proceduresClient, activeStep, procedureNames }: StepProgressProps) => (
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
);

export default StepProgress;
