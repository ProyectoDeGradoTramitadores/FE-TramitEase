import React from 'react';
import { Menu, MenuItem } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';
import { IDS, ROUTES } from '../../constants/routes.ts';
import { ActionMenuProps } from '../../types/TramitViewProps.ts';

const ActionMenu: React.FC<ActionMenuProps> = ({
                                                   anchorEl,
                                                   onClose,
                                                   onDelete,
                                                   idTramit,
                                                   navigate,
                                               }) => {
    const open = Boolean(anchorEl);
    const id = IDS().TRAMITADOR_ID;

    return (
        <Menu anchorEl={anchorEl} open={open} onClose={onClose} sx={{ mt: 2 }}>
            <MenuItem onClick={() => navigate(ROUTES.EDIT_TRAMIT(id, idTramit))}>
                <EditIcon sx={{ mr: 1 }} />
                Editar
            </MenuItem>
            <MenuItem onClick={onDelete}>
                <DeleteIcon sx={{ mr: 1 }} />
                Eliminar
            </MenuItem>
            <MenuItem onClick={() => navigate(ROUTES.TRAMITS_CUSTOM(parseInt(id)))}>
                <CloseIcon sx={{ mr: 1 }} />
                Salir
            </MenuItem>
        </Menu>
    );
};

export default ActionMenu;
