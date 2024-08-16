import React from 'react';
import { Box } from '@mui/material';
import NavigationFolderBreadCrumbs from '../../shared/components/CreateFolder/NavigationFolderBreadCrumbs.tsx';
import CreateFolderFormComponent from '../../shared/components/CreateFolder/CreateFolderFormComponent.tsx';
import CustomButton from '../../shared/components/buttons/CustomButton.tsx';
import { emptyFolder, clearEmptyFolder } from '../../shared/constants/FolderCreate.ts';
import { useClientFolders } from '../../shared/hooks/useClientFolders.ts';
import { useNavigate, useParams } from 'react-router-dom';

const FormularyCreateFolderPage: React.FC = () => {
    const {createNewClientFolder} = useClientFolders();
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const handleSaveFolder = async () => {
        if (emptyFolder) {
            await createNewClientFolder(emptyFolder);
            console.log('create new folder:', emptyFolder);
            clearEmptyFolder();
            navigate(`/TramitEase/Tramitador/${id}/ClientsFolder`);
        }
    };
    return (
        <Box
            sx={{
                backgroundColor: 'white',
                padding: '169px 50px',
                width: '1820px',
                height: '590px',
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            <NavigationFolderBreadCrumbs/>
            <CreateFolderFormComponent />
            <Box
                sx={{
                    position: 'absolute',
                    bottom: '50px',
                    right: '50px',
                }}
            >
                <CustomButton
                    $text={"Save Client"}
                    $textStyle={"bold"}
                    size={"s"}
                    color={"ternary"}
                    onClick={handleSaveFolder}
                />
            </Box>
        </Box>
    );
};

export default FormularyCreateFolderPage;

