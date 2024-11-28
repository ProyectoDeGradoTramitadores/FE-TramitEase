import React from 'react';
import { Typography } from '@mui/material';
import { IDS } from '../../shared/constants/routes.ts';
import { useClientInfoView } from '../../shared/hooks/useClientInfoView.ts';
import ClientCard from '../../shared/components/clients/ClientCard.tsx';
import AdditionalClientInfoCard from '../../shared/components/clients/AdditionalClientInfoCard.tsx';
import ClientFoldersTable from '../../shared/components/clients/ClientFoldersTable.tsx';

const ClientInfoView: React.FC = () => {
    const idClient = IDS().CLIENT_ID;
    const idtramitador = IDS().TRAMITADOR_ID;
    const { client, clientFolders, additionalFields, gender, getAvatar } = useClientInfoView(Number(idClient));

    return (
        <div style={{ display: 'flex', justifyContent: 'center',flexDirection: 'column',
            alignItems: 'center', minHeight: '650px', minWidth: "1765px", padding: '20px' }}>
            {client ? (
                <div  style={{ display: 'flex', gap: '60px', flexDirection: 'column' }}>
                    <div style={{ display: 'flex', gap: '80px', }}>
                        <ClientCard client={client} getAvatar={getAvatar} gender={gender} />
                        {client.additionalInfo && (
                            <AdditionalClientInfoCard additionalFields={additionalFields} />
                        )}
                    </div>
                    {clientFolders && clientFolders?.length > 0 && (
                        <ClientFoldersTable clientFolders={clientFolders} idTramitador={Number(idtramitador)} />
                    )}
                </div>
            ) : (
                <Typography variant="h5" color="textSecondary">
                    Loading client information...
                </Typography>
            )}
        </div>
    );
};

export default ClientInfoView;
