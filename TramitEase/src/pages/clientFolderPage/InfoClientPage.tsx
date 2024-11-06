import TramitCard from '../../features/ClientFolder/TramitCard.tsx';
import ClientTimelineCard from '../../features/ClientFolder/ClientTimelineCard.tsx';
import ProcedureInfoCard from '../../features/ClientFolder/ClientInfoCard.tsx';
import clientTramitImg from '../../shared/assets/image/clientTramit.png';
import ProcedureDataCard from '../../features/ClientFolder/ClientDataCard.tsx';
import CustomButtonClientGroup from '../../shared/widgets/CustomButtonClientGroup.tsx';
import { useClientFolders } from '../../shared/hooks/useClientFolders.ts';
import { IDS } from '../../shared/constants/routes.ts';
import { useEffect, useState } from 'react';
import { ClientFolder } from '../../entities/ClientFolder.ts';
import { useClients } from '../../shared/hooks/useClients.ts';
import { Client } from '../../entities/Client.ts';
import { useTramits } from '../../shared/hooks/useTramits.ts';
import { Tramit } from '../../entities/Tramit.ts';

const InfoClientPage = () => {
    const idClientFolder = IDS().CLIENT_FOLDER_ID
    const {fetchClientFolderById} = useClientFolders();
    const {fetchClientById} = useClients();
    const {fetchTramitById} = useTramits();
    const [clientFolder, setClientFolder] = useState<ClientFolder>();
    const [client, setClient] = useState<Client>();
    const [tramit, setTramit] = useState<Tramit>();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const clientFolderResponse = await fetchClientFolderById(Number(idClientFolder));
                setClientFolder(clientFolderResponse);

                const clientResponse = await fetchClientById(clientFolderResponse?.idClient ?? '');
                setClient(clientResponse);

                const tramitResponse = await fetchTramitById(Number(clientFolderResponse?.idTramit ?? ''));
                setTramit(tramitResponse);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [idClientFolder]);

    return (
        <div>
            <div style={{
                minWidth: '1767px', display: 'flex', flexDirection: 'column',
                padding: '20px', minHeight: '67vh', justifyContent: 'center'
            }}>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '40px' }}>
                    <div>
                        <TramitCard
                            procedureName={clientFolder?.name ?? ''}
                            imageUrl={clientTramitImg}
                        />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '30px',
                        marginTop: '25px' }}>
                        <ProcedureDataCard name={(client?.name ?? '') + ' '+ (client?.lastName ?? '')}
                                           CI={client?.idClient ?? ''}
                                           celnumber={client?.cellNumber ?? ''}
                                           birth={client?.birth ?? ''} email={client?.email ?? ''}  />
                        <ClientTimelineCard
                            startDate={clientFolder?.creationDate ?? ''}
                            endDate={clientFolder?.endDate ?? ''}
                        />
                        <ProcedureInfoCard
                            procedureName={tramit?.name ?? ''}
                            duration={Number(tramit?.dayDuring ?? '')}
                        />
                    </div>
                </div>
            </div>
            <CustomButtonClientGroup idTramit={idClientFolder}/>
        </div>
    );
};

export default InfoClientPage;
