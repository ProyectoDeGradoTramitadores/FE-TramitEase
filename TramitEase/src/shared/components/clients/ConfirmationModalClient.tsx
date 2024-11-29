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

const ConfirmationModalClient: React.FC<ConfirmationModalProps> = ({
                                                                       open,
                                                                       existData,
                                                                       onClose,
                                                                       onConfirm,
                                                                   }) => {
    return (
        <>
            {existData ? (
                <Dialog open={open} onClose={onClose}>
                    <DialogTitle>No se puede eliminar al cliente!</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            El cliente cuenta con carpetas del cliente activas.
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <CustomButton
                            color="primary"
                            size="xs"
                            $text="Cancelar"
                            $textStyle="bold"
                            onClick={onClose}
                        />
                    </DialogActions>
                </Dialog>
            ) : (
                <Dialog open={open} onClose={onClose}>
                    <DialogTitle>Confirmar eliminación</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            ¿Estás seguro de que quieres eliminar este cliente?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <CustomButton
                            color="primary"
                            size="xs"
                            $text="Cancelar"
                            $textStyle="bold"
                            onClick={onClose}
                        />
                        <CustomButton
                            color="ternary"
                            size="xs"
                            $text="Eliminar"
                            $textStyle="bold"
                            onClick={onConfirm}
                        />
                    </DialogActions>
                </Dialog>
            )}
        </>
    );
};

export default ConfirmationModalClient;