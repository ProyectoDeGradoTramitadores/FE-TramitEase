import React from 'react';
import CustomButton from '../../shared/components/buttons/CustomButton.tsx';
import imageSrc from '../../shared/assets/image/folderFIles.png';
import {
    Text,
    TextAndButtonContainer,
    Image,
    PageContainer,
} from '../../pages/clientsFolderPage/ClientsFolderPage.styles.ts';
import { useParams } from 'react-router-dom';

const ClientFolderEmptyPage: React.FC= () => {
    const { id } = useParams<{ id: string }>();

    const navigateToCreateClientFolder = () => {
        if (id) {
            window.location.href = `/TramitEase/Tramitador/${id}/CreateClientFolder/CreateClient`;
        }
    };

    return (
        <PageContainer>
            <Image src={imageSrc} alt="Example" />
            <TextAndButtonContainer>
                <Text>Oops! Todavía no creaste ninguna carpeta de cliente</Text>
                <CustomButton
                    color={"primary"}
                    $textStyle={"bold"}
                    size={"m"}
                    $text={"Crear carpeta de Cliente"}
                    onClick={navigateToCreateClientFolder}
                />
            </TextAndButtonContainer>
        </ PageContainer>
    );
};

export default ClientFolderEmptyPage;
