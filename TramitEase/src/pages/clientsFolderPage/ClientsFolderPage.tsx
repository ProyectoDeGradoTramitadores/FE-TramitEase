import { useParams } from 'react-router-dom';
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

const ClientsFolderPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const tramitId = parseInt(id || '');
    const { filteredClientFolders, loading, error } = useClientFoldersByTramitadorId(tramitId);

    const navigateToCreateClientFolder = useNavigatePage(
        `/TramitEase/Tramitador/${id}/CreateClientFolder/CreateClient`
    );

    const handleFolderClick = (folderId: number) => {
        console.log(folderId);
        console.log(id);
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
                <FolderClientsViewComponent
                    clientFolders={filteredClientFolders}
                    onFolderClick={handleFolderClick}
                />
                <ButtonContainer>
                    <CustomButton
                        color={"ternary"}
                        $textStyle={"bold"}
                        size={"m"}
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