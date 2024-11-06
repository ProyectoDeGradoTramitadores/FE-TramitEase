import CustomButton from '../buttons/CustomButton.tsx';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import TextFieldCustom from '../TextFIeldCustom/TextFieldCustom.tsx';
import { ResetPasswordDialogProps } from '../../types/AuthProps.ts';
import React from 'react';

const ResetPasswordDialog: React.FC<ResetPasswordDialogProps> = ({
                                                                     open,
                                                                     onClose,
                                                                     onReset,
                                                                 }) => {
    const [email, setEmail] = React.useState('');

    const handlePasswordReset = () => {
        if (email) {
            onReset(email);
            setEmail('');
        }
    };

    return (
        <Dialog
            PaperProps={{
                style: { backgroundColor: '#424242', color: '#ffffff' }
            }}
            open={open}
            onClose={onClose}
        >
            <DialogTitle style={{ color: '#ffffff' }}>Restablecer Contraseña</DialogTitle>
            <DialogContent style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <DialogContentText style={{ color: '#ffffff' }}>
                    Introduce tu correo electrónico para recibir un enlace de restablecimiento de contraseña.
                </DialogContentText>
                <TextFieldCustom
                    isRequired={true}
                    text={"Correo Electrónico"}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </DialogContent>
            <DialogActions>
                <CustomButton size={"xs"} color={"primary"} $text={"Cancelar"}
                              $textStyle={"normal"} onClick={onClose} />
                <CustomButton size={"xs"} color={"ternary"} $text={"Enviar"}
                              $textStyle={"normal"} onClick={handlePasswordReset} />
            </DialogActions>
        </Dialog>
    );
};

export default ResetPasswordDialog;