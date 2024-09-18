import React from 'react';
import { Box, TextField, Typography, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { StepItemProps } from '../../shared/types/FormComponentProps.ts';

const StepItem: React.FC<StepItemProps> = ({ step, onChange, onRemove }) => {
    return (
        <Box sx={{ marginTop: '10px', position: 'relative' }}>
            <Typography variant="h6" component="h3" gutterBottom>
                Paso
            </Typography>
            <IconButton onClick={onRemove} sx={{ position: 'absolute', right: 0, top: 0 }}>
                <DeleteIcon />
            </IconButton>
            <TextField
                label="Nombre del Paso"
                value={step.name}
                onChange={(e) => onChange({ ...step, name: e.target.value })}
                fullWidth
                sx={{ marginBottom: '10px' }}
            />
            <TextField
                label="Requerimientos del Paso"
                value={step.requirements}
                onChange={(e) => onChange({ ...step, requirements: e.target.value })}
                fullWidth
                sx={{ marginBottom: '10px' }}
            />
            <TextField
                label="Días del Paso"
                value={step.days}
                onChange={(e) => onChange({ ...step, days: Number(e.target.value) })}
                fullWidth
                type="number"
                sx={{ marginBottom: '10px' }}
            />
        </Box>
    );
};

export default StepItem;
