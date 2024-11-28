import { Box} from '@mui/material';
import React from 'react';
import FormField from '../Fields/FormField.tsx';
import { useCreateFolderForm } from '../../hooks/useCreateFolderForm.ts';
import { useParams } from 'react-router-dom';
import ProcedureStatusField from '../Fields/TramitStatusField.tsx';
import { IDS } from '../../constants/routes.ts';

const CreateFolderFormComponent: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const idClient = IDS().CLIENT_ID;
    const {
        handleInputChange,
        folderData,
        handleIdProcedureStatusChange,
        procedureId
    } = useCreateFolderForm(idClient ?? '');

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
            <FormField
                label="Id carpeta del Cliente"
                isRequired
                onChange={handleInputChange('idClientFolder')}
                value={folderData?.idClientFolder?.toString() ?? ''}
            />
            <FormField
                label="ID Cliente"
                isRequired
                onChange={handleInputChange('idClient')}
                value={folderData?.idClient ?? idClient}
            />
            <FormField
                label="Nombre de la carpeta"
                isRequired
                onChange={handleInputChange('name')}
                value={folderData?.name ?? ''}
            />
            <ProcedureStatusField tramitadorId={id} onChange={handleIdProcedureStatusChange} tramitId={procedureId ?? ''}/>
        </Box>
    );
};

export default CreateFolderFormComponent;
