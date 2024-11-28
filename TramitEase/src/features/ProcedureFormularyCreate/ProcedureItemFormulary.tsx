import React from 'react';
import { Box, TextField, Typography } from '@mui/material';
import CustomButtonStep from '../../shared/components/TramitFormularyCreate/CustomButtonStep.tsx';
import { ProcedureItemFormularyProps, Step } from '../../shared/types/FormComponentProps.ts';
import { useStepProcedures } from '../../shared/hooks/useStepProcedures.ts';
import StepItem from '../TramitFormularyCreate/StepItem.tsx';

const ProcedureItemFormulary: React.FC<ProcedureItemFormularyProps> = ({ procedure, onChange }) => {
    const { deleteExistingStepProcedure } = useStepProcedures();

    const handleAddStep = () => {
        if(procedure != null && onChange !== undefined) {
            const updatedProcedure = { ...procedure, steps: [...procedure?.steps, { name: '', requirements: '', days: 0 }] };
            onChange(updatedProcedure);
        }
    };

    const handleStepChange = (stepIndex: number, updatedStep: Step) => {
        if(procedure != null && updatedStep !== null && onChange !== undefined) {
            const updatedSteps = procedure?.steps?.map((step, i) => (i === stepIndex ? updatedStep : step));
            onChange({ ...procedure, steps: updatedSteps });
        }
    };

    const handleRemoveStep = async (stepIndex: number) => {
        const stepToRemove = procedure?.steps[stepIndex];
        try {
            if (stepToRemove?.idStepProcedure) {
                await deleteExistingStepProcedure(stepToRemove.idStepProcedure);
            }
            if(procedure != null && onChange !== undefined) {
                const updatedSteps = procedure.steps.filter((_, i) => i !== stepIndex);
                onChange({ ...procedure, steps: updatedSteps });
            }
        } catch (error) {
            console.error("Error removing step:", error);
        }
    };

    return (
        <Box sx={{ marginTop: '20px', position: 'relative' }}>
            <Typography variant="h5" component="h2" gutterBottom style={{ color: 'black' }}>
                Procedimiento
            </Typography>
            <TextField
                label="Nombre del Procedimiento"
                value={procedure?.name}
                onChange={(e) => onChange({ ...procedure, name: e.target.value })}
                fullWidth
                sx={{ marginBottom: '10px' }}
            />
            <TextField
                label="Descripción del Procedimiento"
                value={procedure?.description}
                onChange={(e) => onChange({ ...procedure, description: e.target.value })}
                fullWidth
                sx={{ marginBottom: '10px' }}
            />
            <Box sx={{ marginTop: '20px', position: 'relative' }}>
                <CustomButtonStep variant="contained" onClick={handleAddStep}>
                    Añadir Paso del Procedimiento
                </CustomButtonStep>
            </Box>

            {procedure?.steps.map((step, stepIndex) => (
                <StepItem
                    key={stepIndex}
                    step={step}
                    onChange={(updatedStep) => handleStepChange(stepIndex, updatedStep)}
                    onRemove={() => handleRemoveStep(stepIndex)}
                />
            ))}
        </Box>
    );
};

export default ProcedureItemFormulary;
