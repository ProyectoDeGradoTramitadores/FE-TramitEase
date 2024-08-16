import { Box, MenuItem, TextField } from '@mui/material';
import React from 'react';
import { maritalStatus } from '../../constants/MaritalStatus.ts';
import { FieldProps } from '../../types/StatusFieldProps.ts';

const MaritalStatusField: React.FC<FieldProps> = ({ value, onChange }) => (
    <Box sx={{ flex: '1 1 calc(25% - 26px)', minWidth: '220px' }}>
        <TextField
            id="outlined-select-currency"
            select
            label="Estado Civil"
            value={value}
            onChange={onChange}
            helperText="Seleccione su estado civil"
        >
            {maritalStatus.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                    {option.label}
                </MenuItem>
            ))}
        </TextField>
    </Box>
);

export default MaritalStatusField;
