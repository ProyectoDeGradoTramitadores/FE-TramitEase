import React from 'react';
import { Box, Modal, Typography } from '@mui/material';
import CustomButton from '../buttons/CustomButton.tsx';
import { HelpModalProps } from '../../types/ClientFolderProps.ts';
import { useTheme } from 'styled-components';

const HelpModal: React.FC<HelpModalProps> = ({ isOpen, onClose }) => {
    const theme = useTheme();

    return (
        <Modal
            open={isOpen}
            onClose={onClose}
            aria-labelledby="help-modal-title"
            aria-describedby="help-modal-description"
        >
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 300,
                    bgcolor: 'background.paper',
                    boxShadow: 24,
                    p: 4,
                    borderRadius: 2,
                }}
            >
                <Typography
                    id="help-modal-title"
                    variant="h6"
                    component="h2"
                    sx={{ color: 'black' }}
                >
                    Colores de las Carpetas
                </Typography>
                <Typography
                    id="help-modal-description"
                    sx={{ mt: 2, color: 'black' }}
                >
                    - <b style={{ color: theme.colors.success.default }}>Verde:</b> Carpeta en Progreso. <br />
                    - <b style={{ color: theme.colors.warning.default }}>Amarillo:</b> Carpeta con pasos próximos a
                    vencer. <br />
                    - <b style={{ color: theme.colors.error.default }}>Rojo:</b> Carpeta con pasos vencidos. <br />
                    - <b style={{ color: theme.colors.secondary.default }}>Gris Oscuro:</b> Carpeta no iniciada.<br />
                    - <b style={{ color: theme.colors.primary.default }}>Gris Claro:</b> Carpeta completada.
                </Typography>
                <Box mt={2} textAlign="right">
                    <CustomButton
                        color="primary"
                        $textStyle="bold"
                        size="s"
                        $text="Cerrar"
                        onClick={onClose}
                    />
                </Box>
            </Box>
        </Modal>
    );
};

export default HelpModal;
