import React from 'react';
import { Typography } from '@mui/material';
import CustomButton from '../../shared/components/buttons/CustomButton.tsx';
import CardClientList from '../../features/Client/CardClientList.tsx';
import { IDS } from '../../shared/constants/routes.ts';
import SearchBar from '../../shared/components/Search/SearchBar.tsx';
import { useClientsPage } from '../../shared/hooks/useClientsPage.ts';

const ClientsPage: React.FC = () => {
    const idTramitador = IDS().TRAMITADOR_ID;
    const {handleSearch, filteredClients, handleCreateClient} = useClientsPage(Number(idTramitador));

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                padding: '40px',
                backgroundColor: 'white',
                minHeight: '95vh',
                minWidth: '1759px',
                gap: "23px"
            }}
        >
            <Typography variant="h3" gutterBottom style={{ color: 'black', marginTop: '200px' }}>
                Clientes
            </Typography>
            <SearchBar
                placeholder="Buscar cliente..."
                onSearch={handleSearch}
            />
            <CardClientList
                clients={filteredClients.map(client => ({
                    name: client.name ?? "",
                    lastName: client.lastName ?? "",
                    ci: client.ciClient,
                    keyClient: client.idClient,
                }))}
            />
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
