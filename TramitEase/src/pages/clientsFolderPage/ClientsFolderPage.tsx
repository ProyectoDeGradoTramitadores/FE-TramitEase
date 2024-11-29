import { useNavigate, useParams } from 'react-router-dom';
import {
    PageContainerClientFolder,
    ButtonContainer,
    TitleTypography,
} from './ClientsFolderPage.styles.ts';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import FolderClientsViewComponent from '../../shared/components/CreateFolder/FolderClientsVIewComponent.tsx';
import ClientFolderEmptyPage from '../../features/ClientFolder/ClientFolderEmptyPage.tsx';
import CustomButton from '../../shared/components/buttons/CustomButton.tsx';
import { useNavigatePage } from '../../shared/hooks/UseNavigatePage.ts';
import { useClientFoldersByTramitadorId } from '../../shared/hooks/useClientFoldersByTramitadorId.ts';
import { ROUTES } from '../../shared/constants/routes.ts';
import SearchBar from '../../shared/components/Search/SearchBar.tsx';
import { useEffect, useState } from 'react';
import { Box, IconButton } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { NotificationModal } from '../../features/notification/NotificationModal.tsx';
import { useSendWhatsAppMessage } from '../../shared/hooks/useSendWhatsAppMessage.ts';
import HelpModal from '../../shared/components/ClientFolder/HelpModal.tsx';

const ClientsFolderPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const tramitId = parseInt(id ?? '');
    const { filteredClientFolders, handleSearch, filteredFolders, loading, error } = useClientFoldersByTramitadorId(tramitId);
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isHelpModalOpen, setIsHelpModalOpen] = useState(false);
    const {sendMessage} = useSendWhatsAppMessage(filteredClientFolders);

    const navigateToCreateClientFolder = useNavigatePage(
        `/Tramitador/${id}/CreateClientFolder/CreateClient`
    );

    useEffect(() => {
        if (filteredClientFolders.length > 0) {
            sendMessage();
        }
    }, [filteredClientFolders]);

    const handleFolderClick = (folderId: number) => {
        const routeCreateFolder = ROUTES.CLIENT_FOLDER((id ?? ''), folderId);
        navigate(routeCreateFolder);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        filteredClientFolders.length > 0 ? (
            <PageContainerClientFolder>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                    <TitleTypography variant="h4" gutterBottom>
                        Carpetas del Cliente
                    </TitleTypography>
                    <Box display="flex" gap={4}>
                        <IconButton
                            onClick={() => setIsHelpModalOpen(true)}
                            sx={{ backgroundColor: '#e0e0e0', color: '#555' }}
                        >
                            <HelpOutlineIcon />
                        </IconButton>
                        <IconButton
                            onClick={() => setIsModalOpen(true)}
                            sx={{ backgroundColor: '#d3d3d3', color: '#555' }}
                        >
                            <NotificationsIcon />
                        </IconButton>
                    </Box>
                </Box>
                <HelpModal isOpen={isHelpModalOpen} onClose={() => setIsHelpModalOpen(false)} />
                <NotificationModal open={isModalOpen} onClose={() => setIsModalOpen(false)} />
                <SearchBar placeholder="Buscar carpeta..." onSearch={handleSearch} />
                <FolderClientsViewComponent
                    clientFolders={filteredFolders}
                    onFolderClick={handleFolderClick}
                />
                <ButtonContainer>
                    <CustomButton
                        color={"ternary"}
                        $textStyle={"bold"}
                        size={"s"}
                        $text={"Crear una carpeta nueva"}
                        onClick={navigateToCreateClientFolder}
                    />
                </ButtonContainer>
            </PageContainerClientFolder>
        ) : (
            <ClientFolderEmptyPage />
        )
    );
};

export default ClientsFolderPage;
