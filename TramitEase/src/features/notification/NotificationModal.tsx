import React from 'react';
import { Modal, Box, Typography, TextField, Checkbox, FormControlLabel } from '@mui/material';
import { NotificationModalProps } from '../../shared/types/ModalNotification';
import CustomButton from '../../shared/components/buttons/CustomButton.tsx';
import { useNotificationSettings } from '../../shared/hooks/useNotificationSettings.ts';

export const NotificationModal: React.FC<NotificationModalProps> = ({ open, onClose }) => {
    const {
        daysBeforeDue,
        whatsAppNotifications,
        notifyOnExpiry,
        setDaysBeforeDue,
        setWhatsAppNotifications,
        setNotifyOnExpiry,
        saveSettings,
    } = useNotificationSettings();

    const handleSave = () => {
        saveSettings();
        onClose();
    };

    return (
        <Modal open={open} onClose={onClose}>
            <Box sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 600,
                bgcolor: 'background.paper',
                borderRadius: 1,
                boxShadow: 24,
                p: 4,
            }}>
                <Typography variant="h6" component="h2" sx={{ mb: 2, color: 'black' }}>
                    Personalización de Notificaciones
                </Typography>

                <Box display="flex" sx={{ mb: 2 }}>
                    <Typography variant="body1" sx={{ mr: 2, color: 'black' }}>
                        Días de antelación antes del vencimiento:
                    </Typography>
                    <TextField
                        type="number"
                        variant="outlined"
                        size="small"
                        value={daysBeforeDue}
                        onChange={(e) => {
                            const value = Number(e.target.value);
                            if (value > 0) {
                                setDaysBeforeDue(value);
                            } else if (e.target.value === "") {
                                setDaysBeforeDue("");
                            }
                        }}
                        sx={{ maxWidth: 100, mr: 1 }}
                        inputProps={{ min: 1 }}
                    />

                    <Typography variant="body1" sx={{ color: 'black' }}>días</Typography>
                </Box>

                <FormControlLabel
                    control={
                        <Checkbox
                            checked={whatsAppNotifications}
                            onChange={(e) => setWhatsAppNotifications(e.target.checked)}
                        />
                    }
                    label={
                        <Typography variant="body1" sx={{ color: 'black' }}>
                            ¿Quieres recibir notificaciones por WhatsApp?
                        </Typography>
                    }
                />

                <FormControlLabel
                    control={
                        <Checkbox
                            checked={notifyOnExpiry}
                            onChange={(e) => setNotifyOnExpiry(e.target.checked)}
                        />
                    }
                    label={
                        <Typography variant="body1" sx={{ color: 'black' }}>
                            ¿Quieres recibir notificaciones cuando se venza un Client Folder?
                        </Typography>
                    }
                />

                <Typography variant="caption" color="textSecondary" sx={{ display: 'block', mt: 3, mb: 3, color: 'black', marginTop:"73px" }}>
                    Los mensajes se envían al número de WhatsApp con el que se registró.
                </Typography>

                <Box display="flex" justifyContent="flex-end" sx={{ gap: "20px" }}>
                    <CustomButton
                        color={"ternary"}
                        $textStyle={"bold"}
                        size={"s"}
                        $text={"Cancelar"}
                        onClick={onClose}
                    />
                    <CustomButton
                        color={"secondary"}
                        $textStyle={"bold"}
                        size={"s"}
                        $text={"Guardar"}
                        onClick={handleSave}
                    />
                </Box>
            </Box>
        </Modal>
    );
};
