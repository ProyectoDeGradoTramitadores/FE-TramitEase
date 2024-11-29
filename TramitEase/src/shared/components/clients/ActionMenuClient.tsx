import React from 'react';
import { Menu, MenuItem } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';
import { IDS, ROUTES } from '../../constants/routes.ts';
import { ActionMenuProps } from '../../types/TramitViewProps.ts';
import EditIcon from '@mui/icons-material/Edit';

const ActionMenuClient: React.FC<ActionMenuProps> = ({
                                                         anchorEl,
                                                         onClose,
                                                         onDelete,
                                                         navigate,
                                                         onEdit
                                                           }) => {
    const open = Boolean(anchorEl);
    const id = IDS().TRAMITADOR_ID;

    return (
        <Menu anchorEl={anchorEl} open={open} onClose={onClose} sx={{ mt: 2 }}>
            <MenuItem onClick={onDelete}>
                <DeleteIcon sx={{ mr: 1 }} />
                Eliminar
            </MenuItem>
            <MenuItem onClick={onEdit}>
                <EditIcon sx={{ mr: 1 }} />
                Editar
            </MenuItem>
            <MenuItem onClick={() => navigate(ROUTES.CLIENTS(parseInt(id)))}>
                <CloseIcon sx={{ mr: 1 }} />
                Salir
            </MenuItem>
        </Menu>
    );
};

export default ActionMenuClient;
