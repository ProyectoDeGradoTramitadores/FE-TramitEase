import { useNavigate, useParams } from 'react-router-dom';
import {
    PageContainerClientFolder,
    ButtonContainer,
    TitleTypography,
} from './ClientsFolderPage.styles.ts';
import FolderClientsViewComponent from '../../shared/components/CreateFolder/FolderClientsVIewComponent.tsx';
import ClientFolderEmptyPage from '../../features/ClientFolder/ClientFolderEmptyPage.tsx';
import CustomButton from '../../shared/components/buttons/CustomButton.tsx';
import { useNavigatePage } from '../../shared/hooks/UseNavigatePage.ts';
import { useClientFoldersByTramitadorId } from '../../shared/hooks/useClientFoldersByTramitadorId.ts';
import { ROUTES } from '../../shared/constants/routes.ts';
import SearchBar from '../../shared/components/Search/SearchBar.tsx';

const ClientsFolderPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const tramitId = parseInt(id ?? '');
    const { filteredClientFolders, handleSearch, filteredFolders, loading, error } = useClientFoldersByTramitadorId(tramitId);
    const navigate = useNavigate();

    const navigateToCreateClientFolder = useNavigatePage(
        `/TramitEase/Tramitador/${id}/CreateClientFolder/CreateClient`
    );

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
                <TitleTypography variant="h4" gutterBottom>
                    Carpetas del Cliente
                </TitleTypography>
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
