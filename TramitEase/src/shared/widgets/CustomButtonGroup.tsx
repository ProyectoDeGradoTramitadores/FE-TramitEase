import React from 'react';
import { Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useCustomButtonGroup } from '../hooks/useCustomButtonGroup.ts';
import CustomFabButton from '../components/TramitViewPage/CustomFabButton.tsx';
import ActionMenu from '../components/TramitViewPage/ActionMenu.tsx';
import WarningModal from '../components/TramitViewPage/WarningModal.tsx';
import ConfirmationModal from '../components/TramitViewPage/ConfirmationModal.tsx';
import { CustomButtonGroupProps } from '../types/TramitViewProps.ts';

const CustomButtonGroup: React.FC<CustomButtonGroupProps> = ({ idTramit }) => {
    const navigate = useNavigate();
    const {
        anchorEl,
        openWarningModal,
        openConfirmationModal,
        handleMenuOpen,
        handleMenuClose,
        handleDelete,
        confirmDelete,
        setOpenWarningModal,
        setOpenConfirmationModal,
    } = useCustomButtonGroup(idTramit);

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
            <ActionMenu
                anchorEl={anchorEl}
                onClose={handleMenuClose}
                onDelete={handleDelete}
                idTramit={idTramit}
                navigate={handleNavigate}
            />
            <WarningModal
                open={openWarningModal}
                onClose={() => setOpenWarningModal(false)}
            />

            <ConfirmationModal
                open={openConfirmationModal}
                onClose={() => setOpenConfirmationModal(false)}
                onConfirm={confirmDelete}
            />
        </Box>
    );
};

export default CustomButtonGroup;
