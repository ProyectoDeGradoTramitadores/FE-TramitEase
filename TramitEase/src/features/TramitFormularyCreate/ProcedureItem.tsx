import React from 'react';
import { Box, TextField, Typography, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import CustomButtonStep from '../../shared/components/TramitFormularyCreate/CustomButtonStep.tsx';
import StepItem from './StepItem.tsx';
import { ProcedureItemProps, Step } from '../../shared/types/FormComponentProps.ts';

const ProcedureItem: React.FC<ProcedureItemProps> = ({ procedure, onChange, onRemove }) => {
    const handleAddStep = () => {
        const updatedProcedure = { ...procedure, steps: [...procedure.steps, { name: '', requirements: '', days: 0 }] };
        onChange(updatedProcedure);
    };

    const handleStepChange = (stepIndex: number, updatedStep: Step) => {
        const updatedSteps = procedure.steps.map((step, i) => (i === stepIndex ? updatedStep : step));
        onChange({ ...procedure, steps: updatedSteps });
    };

    const handleRemoveStep = (stepIndex: number) => {
        const updatedSteps = procedure.steps.filter((_, i) => i !== stepIndex);
        onChange({ ...procedure, steps: updatedSteps });
    };

    return (
        <Box sx={{ marginTop: '20px', position: 'relative' }}>
            <Typography variant="h5" component="h2" gutterBottom style={{ color: 'black' }}>
                Procedimiento
            </Typography>
            <IconButton onClick={onRemove} sx={{ position: 'absolute', right: 0, top: 0 }}>
                <DeleteIcon />
            </IconButton>
            <TextField
                label="Nombre del Procedimiento"
                value={procedure.name}
                onChange={(e) => onChange({ ...procedure, name: e.target.value })}
                fullWidth
                sx={{ marginBottom: '10px' }}
            />
            <TextField
                label="Descripción del Procedimiento"
                value={procedure.description}
                onChange={(e) => onChange({ ...procedure, description: e.target.value })}
                fullWidth
                sx={{ marginBottom: '10px' }}
            />
            <Box sx={{ marginTop: '20px', position: 'relative' }}>
                <CustomButtonStep variant="contained" onClick={handleAddStep}>
                    Añadir Paso del Procedimiento
                </CustomButtonStep>
            </Box>

            {procedure.steps.map((step, stepIndex) => (
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

export default ProcedureItem;
