import { Box } from '@mui/material';
import React from 'react';
import TextFieldCustom from '../TextFIeldCustom/TextFieldCustom.tsx';
import { FormFieldProps } from '../../types/FormComponentProps.ts';

const FormField: React.FC<FormFieldProps> = ({ label, isRequired, onChange, value }) => (
    <Box sx={{ flex: '1 1 calc(25% - 26px)', minWidth: '220px' }}>
        <TextFieldCustom text={label} isRequired={isRequired} onChange={onChange} value={value} />
    </Box>
);

export default FormField;
