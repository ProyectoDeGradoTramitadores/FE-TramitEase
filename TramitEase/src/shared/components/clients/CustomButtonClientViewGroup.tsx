import React from 'react';
import { Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useCustomButtonGroupClient } from '../../hooks/useCustomButtonGroupClient.ts';
import CustomFabButton from '../TramitViewPage/CustomFabButton.tsx';
import ActionMenuClient from './ActionMenuClient.tsx';
import ConfirmationModalClient from './ConfirmationModalClient.tsx';

interface CustomButtonClientViewGroupProps {
    idClient: number;
}

const CustomButtonClientViewGroup: React.FC<CustomButtonClientViewGroupProps> = ({ idClient }) => {
    const navigate = useNavigate();
    const {
        anchorEl,
        openConfirmationModal,
        containsClientFolders,
        handleMenuOpen,
        handleEdit,
        handleMenuClose,
        handleDelete,
        confirmDelete,
        setOpenConfirmationModal,
    } = useCustomButtonGroupClient(idClient);

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
            <ActionMenuClient
                onEdit={handleEdit}
                anchorEl={anchorEl}
                onClose={handleMenuClose}
                onDelete={handleDelete}
                navigate={handleNavigate}
            />
            <ConfirmationModalClient
                open={openConfirmationModal}
                onClose={() => setOpenConfirmationModal(false)}
                onConfirm={confirmDelete}
                existData={containsClientFolders}
            />
        </Box>
    );
};

export default CustomButtonClientViewGroup;
