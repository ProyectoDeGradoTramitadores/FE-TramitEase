import { useState } from 'react';
import { useTramits } from './useTramits.ts';
import { useTramitProcedures } from './useTramitProcedures.ts';
import { useClientFolders } from './useClientFolders.ts';
import { useNavigate } from 'react-router-dom';
import { IDS, ROUTES } from '../constants/routes.ts';

export const useCustomButtonGroup = (idTramit: string | number) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [openWarningModal, setOpenWarningModal] = useState(false);
    const [openConfirmationModal, setOpenConfirmationModal] = useState(false);
    const navigate = useNavigate();
    const id = IDS().TRAMITADOR_ID

    const { deleteExistingTramit } = useTramits();
    const {
        fetchTramitProceduresByTramitId,
        deleteExistTramitProcedure,
    } = useTramitProcedures();
    const { fetchClientFoldersByTramitId } = useClientFolders();

    const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleDelete = async () => {
        try {
            const clientFolders = await fetchClientFoldersByTramitId(Number(idTramit));
            if (clientFolders && clientFolders.length > 0) {
                setOpenWarningModal(true);
            } else {
                setOpenConfirmationModal(true);
            }
        } catch (error) {
            console.error('Error fetching client folders:', error);
        } finally {
            handleMenuClose();
        }
    };

    const confirmDelete = async () => {
        try {
            const tramitProcedures = await fetchTramitProceduresByTramitId(
                Number(idTramit)
            );
            if (tramitProcedures && tramitProcedures.length > 0) {
                const deletePromises = tramitProcedures.map((procedure) =>
                    deleteExistTramitProcedure(procedure.idTramitProcedure)
                );
                await Promise.all(deletePromises);
            }
            await deleteExistingTramit(Number(idTramit));
            navigate(ROUTES.TRAMITS_CUSTOM(parseInt(id)));
        } catch (error) {
            console.error('Error deleting tramit:', error);
        } finally {
            setOpenConfirmationModal(false);
        }
    };

    return {
        anchorEl,
        openWarningModal,
        openConfirmationModal,
        handleMenuOpen,
        handleMenuClose,
        handleDelete,
        confirmDelete,
        setOpenWarningModal,
        setOpenConfirmationModal,
    };
};
