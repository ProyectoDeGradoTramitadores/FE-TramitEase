import { Box, Fab, IconButton } from '@mui/material';
import React from 'react';
import FormField from '../Fields/FormField.tsx';
import MaritalStatusField from '../Fields/MaritalStatusField.tsx';
import theme from '../../theme/theme';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import DatePickerCustom from '../DatePicker/DatePickerCustom';
import { useClientForm } from '../../hooks/useClientForm.ts';

const FormComponent: React.FC = () => {
    const {
        clientId,
        clientData,
        additionalFields,
        handleClientIdChange,
        handleAddField,
        handleRemoveField,
        handleFieldChange,
        handleDateChange,
        handleInputChange,
        handleMaritalStatusChange
    } = useClientForm();


    return (
        <Box
            sx={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '26px',
                alignItems: 'center',
                maxWidth: '1300px',
                margin: '0 auto',
                padding: '16px',
            }}
        >
            <FormField label="CI" isRequired onChange={handleClientIdChange} value={clientId} />
            <FormField label="Nombre" isRequired={false} value={clientData?.name ?? ''} onChange={handleInputChange('name')} />
            <FormField label="Segundo Nombre" isRequired={false} value={clientData?.secondName ?? ''} onChange={handleInputChange('secondName')} />
            <FormField label="Primer Apellido" isRequired={false} value={clientData?.lastName ?? ''} onChange={handleInputChange('lastName')} />
            <FormField label="Segundo Apellido" isRequired={false} value={clientData?.surname ?? ''} onChange={handleInputChange('surname')} />
            <DatePickerCustom text="Fecha de Nacimiento" value={clientData?.birth ?? ''} onChange={handleDateChange} />
            <FormField label="Email" isRequired={false} value={clientData?.email ?? ''} onChange={handleInputChange('email')} />
            <FormField label="Numero de Celular" isRequired={false} value={clientData?.cellNumber ?? ''} onChange={handleInputChange('cellNumber')} />
            <MaritalStatusField value={clientData?.maritalStatus ?? ''} onChange={handleMaritalStatusChange} />
            <FormField label="Nacionalidad" isRequired={false} value={clientData?.nationality ?? ''} onChange={handleInputChange('nationality')} />
            {additionalFields.map((field) => (
                <Box key={field.id} sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <FormField
                        label={field.label}
                        value={field.value}
                        onChange={(e) => handleFieldChange(field.id, e.target.value)}
                        isRequired={false}
                    />
                    <IconButton onClick={() => handleRemoveField(field.id)} aria-label="delete">
                        <DeleteIcon />
                    </IconButton>
                </Box>
            ))}

            <Box sx={{ flex: '1 1 calc(25% - 26px)', minWidth: '220px' }}>
                <Fab sx={{ color: theme.colors.primary.hower }} aria-label="add" onClick={handleAddField}>
                    <AddIcon />
                </Fab>
            </Box>
        </Box>
    );
};

export default FormComponent;
