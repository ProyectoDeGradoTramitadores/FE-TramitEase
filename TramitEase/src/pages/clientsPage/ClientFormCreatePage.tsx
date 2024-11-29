import React, { useEffect } from 'react';
import { Box } from '@mui/material';
import FormComponent from '../../shared/components/CreateClient/FormComponent.tsx';
import TitleBreadCrumbsFormClient from '../../shared/components/CreateClient/TitleBreadCrumbsFormClient.tsx';
import CustomButton from '../../shared/components/buttons/CustomButton.tsx';
import { emptyClient } from '../../shared/constants/ClientCreate.ts';
import { useClients } from '../../shared/hooks/useClients';
import { useNavigate, useParams } from 'react-router-dom';

const ClientFormCreatePage: React.FC = () => {
    const { createNewClient, updateExistingClient, checkClientExistsAndFetch, fetchClientById } = useClients();
    const { id } = useParams<{ id: string }>();
    const { idClient } = useParams<{ idClient: string }>();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                if(idClient){
                    const clientFetch = await fetchClientById(Number(idClient));

                    emptyClient.ciClient = clientFetch?.ciClient ?? "";
                    emptyClient.idClient = clientFetch?.idClient ?? 0;
                }
            } catch (error) {
                console.error('Error fetching client data:', error);
            }
        };

        fetchData();
    }, []);

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
