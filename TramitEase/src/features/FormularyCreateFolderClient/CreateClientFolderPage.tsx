import React from 'react';
import { Box } from '@mui/material';
import FormComponent from '../../shared/components/CreateClient/FormComponent.tsx';
import TitleBreadCrumbs from '../../shared/components/CreateClient/TitleBreadCrumbs.tsx';
import CustomButton from '../../shared/components/buttons/CustomButton.tsx';
import { emptyClient } from '../../shared/constants/ClientCreate.ts';
import { useClients } from '../../shared/hooks/useClients';
import { useNavigate, useParams } from 'react-router-dom';

const CreateClientFolderPage: React.FC = () => {
    const { createNewClient, updateExistingClient, checkClientExistsAndFetch } = useClients();
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const handleSaveClient = async () => {
        const existingClient = await checkClientExistsAndFetch(emptyClient.idClient);
        if (existingClient) {
            await updateExistingClient(emptyClient.idClient, emptyClient);
            console.log('Client updated:', emptyClient);
        } else {
            await createNewClient(emptyClient);
            console.log('New client created:', emptyClient);
        }
        navigate(`/TramitEase/Tramitador/${id}/CreateClientFolder/CreateFolder`);
    };

    return (
        <Box
            sx={{
                backgroundColor: 'white',
                padding: '269px 50px',
                width: '1820px',
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            <TitleBreadCrumbs />
            <FormComponent />
            <Box
                sx={{
                    position: 'absolute',
                    bottom: '50px',
                    right: '50px',
                }}
            >
                <CustomButton
                    $text={"Save Client"}
                    $textStyle={"bold"}
                    size={"s"}
                    color={"ternary"}
                    onClick={handleSaveClient}
                />
            </Box>
        </Box>
    );
};

export default CreateClientFolderPage;
