// src/features/customButtonGroup/components/ConfirmationModal.tsx

import React from 'react';
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from '@mui/material';
import { ConfirmationModalProps } from '../../types/TramitViewProps.ts';
import CustomButton from '../buttons/CustomButton.tsx';

const ConfirmationModalClientFolder: React.FC<ConfirmationModalProps> = ({
                                                                 open,
                                                                 onClose,
                                                                 onConfirm,
                                                             }) => {
    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Confirmar eliminación</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    ¿Estás seguro de que quieres eliminar esta carpeta de cliente?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <CustomButton color={"primary"} size={"xs"} $text={"Cancelar"}
                              $textStyle={"bold"} onClick={onClose}/>
                <CustomButton color={"ternary"} size={"xs"} $text={"Eliminar"}
                              $textStyle={"bold"} onClick={onConfirm}/>
            </DialogActions>
        </Dialog>
    );
};

export default ConfirmationModalClientFolder;
