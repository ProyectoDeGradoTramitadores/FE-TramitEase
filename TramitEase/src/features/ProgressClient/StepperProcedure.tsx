import {
    Stepper,
    Step,
    StepLabel,
} from '@mui/material';
import useProgressClientLogic from '../../shared/hooks/useProgressClientLogic.ts';
import { RedStepIcon } from '../../shared/components/stepperIcons/CustomStepIcons.styles.ts';
import React from 'react';
import { ProgressClientProps } from '../../shared/types/ProgressClientProps.ts';

const StepperProcedure: React.FC<ProgressClientProps> = (idFolderClient) => {
    const {
        activeStep,
        proceduresClient,
        procedureNames
    } = useProgressClientLogic(String(idFolderClient.idFolderClient));
    return (
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
};

export default StepperProcedure;
