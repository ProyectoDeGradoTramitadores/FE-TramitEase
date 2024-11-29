import { useState } from 'react';
import { useClientFolders } from './useClientFolders.ts';
import { IDS, ROUTES } from '../constants/routes.ts';
import { useClients } from './useClients.ts';
import { useNavigate } from 'react-router-dom';

export const useCustomButtonGroupClient = (idClient: string | number) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [openConfirmationModal, setOpenConfirmationModal] = useState(false);
    const [containsClientFolders, setContainsClientFolders] = useState(false);
    const id = IDS().TRAMITADOR_ID
    const navigate = useNavigate();

    const { fetchClientFoldersByClientId  } = useClientFolders();
    const { deleteExistingClient } = useClients();

    const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleEdit = () => {
        navigate(`/Tramitador/${id}/clients/editClient/${idClient}`);
    }

    const handleDelete = async () => {
        try {
            const clientsFolder = await fetchClientFoldersByClientId(Number(idClient));
            if(clientsFolder.length > 0){
                setContainsClientFolders(clientsFolder.length > 0);
            }
        } finally {
            handleMenuClose();
            setOpenConfirmationModal(true);
        }
    };

    const confirmDelete = async () => {
        try {
            await deleteExistingClient(Number(idClient));
            navigate(ROUTES.CLIENTS(Number(id)));
        } catch (error) {
            console.error('Error deleting Client:', error);
        } finally {
            setOpenConfirmationModal(false);
        }
    };

    return {
        anchorEl,
        openConfirmationModal,
        handleMenuOpen,
        handleMenuClose,
        handleDelete,
        containsClientFolders,
        handleEdit,
        confirmDelete,
        setOpenConfirmationModal,
    };
};
