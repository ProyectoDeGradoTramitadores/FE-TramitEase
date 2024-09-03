import React from 'react';
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from '@mui/material';
import { WarningModalProps } from '../../types/TramitViewProps.ts';
import CustomButton from '../buttons/CustomButton.tsx';

const WarningModal: React.FC<WarningModalProps> = ({ open, onClose }) => {
    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Oops</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    No puede eliminar el trámite porque hay carpetas de clientes que utilizan este tramite.
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <CustomButton color={"ternary"} size={"xs"} $text={"Cerrar"}
                              $textStyle={"bold"} onClick={onClose}/>
            </DialogActions>
        </Dialog>
    );
};

export default WarningModal;
