import React from 'react';
import { Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import CustomFabButton from '../components/TramitViewPage/CustomFabButton.tsx';
import { CustomButtonGroupProps } from '../types/TramitViewProps.ts';
import ActionMenuClientFolder from '../components/ClientFolder/ActionMenuClientFolder.tsx';
import ConfirmationModalClientFolder from '../components/ClientFolder/ConfirmationModalClientFolder.tsx';
import { useCustomButtonGroupClientFolder } from '../hooks/useCustomButtonGroupClientFolder.ts';

const CustomButtonClientGroup: React.FC<CustomButtonGroupProps> = ({ idTramit }) => {
    const navigate = useNavigate();
    const {
        anchorEl,
        openConfirmationModal,
        handleMenuOpen,
        handleMenuClose,
        handleDelete,
        confirmDelete,
        setOpenConfirmationModal,
    } = useCustomButtonGroupClientFolder(idTramit);

    const handleNavigate = (path: string) => {
        navigate(path);
    };

    return (
        <Box
            sx={{
                padding: '0 50px 0 10px',
                display: 'flex',
                justifyContent: 'flex-end',
                gap: '18px',
                mt: 2,
            }}
        >
            <CustomFabButton onClick={handleMenuOpen} />
            <ActionMenuClientFolder
                anchorEl={anchorEl}
                onClose={handleMenuClose}
                onDelete={handleDelete}
                navigate={handleNavigate}
            />
            <ConfirmationModalClientFolder
                open={openConfirmationModal}
                onClose={() => setOpenConfirmationModal(false)}
                onConfirm={confirmDelete}
            />
        </Box>
    );
};

export default CustomButtonClientGroup;
