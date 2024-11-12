import React, { useEffect, useState } from 'react';
import { Typography } from '@mui/material';
import CustomButton from '../../shared/components/buttons/CustomButton.tsx';
import CardClientList from '../../features/Client/CardClientList.tsx';
import { useClients } from '../../shared/hooks/useClients.ts';
import { IDS } from '../../shared/constants/routes.ts';
import { Client } from '../../entities/Client.ts';
import { useNavigate } from 'react-router-dom';

const ClientsPage: React.FC = () => {
    const idTramitador = IDS().TRAMITADOR_ID
    const {fetchClientsByTramitadorId } = useClients()
    const navigate = useNavigate();
    const [clients, setClients] = useState<Client[]>();

    useEffect(() => {
        const fetchClients = async () => {
            try {
                const clientsT = await fetchClientsByTramitadorId(Number(idTramitador));
                setClients(clientsT)
            } catch (error) {
                console.error("Error fetching tramitadores:", error);
            }
        };

        fetchClients();
    }, [idTramitador]);

    const handleCreateClient = () => {
        navigate(`CreateClient`);
    };

    return (
        <div style={{
            display: 'flex', flexDirection: 'column',
            padding: '20px', backgroundColor: 'white', minHeight: '95vh', minWidth: '1810px', gap: "23px"
        }}>
            <Typography variant="h3" gutterBottom style={{ color: 'black', marginTop: '200px' }}>
                Clientes
            </Typography>
            <CardClientList clients={clients? clients?.map(client => ({
                name: client.name ?? "",
                ci: client.idClient,
                keyClient: client.idClient,
            })) : []} />
            <div style={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
                <CustomButton
                    onClick={handleCreateClient}
                    size="s"
                    color="ternary"
                    $text="Crear Cuenta Nueva"
                    $textStyle="bold"
                />
            </div>
        </div>
    );
};

export default ClientsPage;
