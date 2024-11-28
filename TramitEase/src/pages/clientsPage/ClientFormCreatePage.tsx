import React from 'react';
import { Box } from '@mui/material';
import FormComponent from '../../shared/components/CreateClient/FormComponent.tsx';
import TitleBreadCrumbsFormClient from '../../shared/components/CreateClient/TitleBreadCrumbsFormClient.tsx';
import CustomButton from '../../shared/components/buttons/CustomButton.tsx';
import { emptyClient } from '../../shared/constants/ClientCreate.ts';
import { useClients } from '../../shared/hooks/useClients';
import { useNavigate, useParams } from 'react-router-dom';

const ClientFormCreatePage: React.FC = () => {
    const { createNewClient, updateExistingClient, checkClientExistsAndFetch } = useClients();
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const handleSaveClient = async () => {
        const existingClient = await checkClientExistsAndFetch(emptyClient.ciClient);
        if (id != null) {
            emptyClient.idTramitador = Number(id);
        }
        if (existingClient) {
            await updateExistingClient(emptyClient.idClient, emptyClient);
        } else {
            await createNewClient(emptyClient);
        }
        navigate(`/Tramitador/${id}/clients`);
    };

    return (
        <Box
            sx={{
                backgroundColor: 'white',
                padding: '269px 50px',
                width: '1738px',
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            <TitleBreadCrumbsFormClient />
            <FormComponent />
            <Box
                sx={{
                    position: 'absolute',
                    bottom: '50px',
                    right: '50px',
                }}
            >
                <CustomButton
                    $text={"Guardar Cliente"}
                    $textStyle={"bold"}
                    size={"s"}
                    color={"ternary"}
                    onClick={handleSaveClient}
                />
            </Box>
        </Box>
    );
};

export default ClientFormCreatePage;
