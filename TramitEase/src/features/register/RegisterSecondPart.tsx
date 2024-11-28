import React from 'react';
import { Box, Typography, Grid, FormControl, InputLabel, OutlinedInput } from '@mui/material';
import CustomButton from '../../shared/components/buttons/CustomButton.tsx';
import { RegisterSecondPartProps } from '../../shared/types/AuthProps.ts';
import StepGuide from './StepGuide.tsx';
import imageQr from "../../shared/assets/image/qrTwilio.png";
import sendTwilio from "../../shared/assets/image/sendMessageTwilio.jpeg";

const RegisterSecondPart: React.FC<RegisterSecondPartProps> = ({
                                                                   formValues,
                                                                   handleChange,
                                                                   handleVerifyPhone,
                                                               }) => {
    return (
        <Grid item xs={6}
              style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '20px' }}>
            <Typography variant="h4" style={{ color: 'white' }}>TramitEase</Typography>
            <Typography variant="h2" style={{ fontWeight: 'bold', color: '#fa8a38' }}>
                Registra tu Numero de Celular
            </Typography>
            <Typography variant="body1" style={{ color: 'white', marginTop: '20px' }}>
                Verifica tu numero de Celular, introduciendo el codigo enviado a tu celular:
            </Typography>
            <FormControl variant="outlined" margin="normal" sx={{ width: '500px' }}>
                <InputLabel style={{ color: 'white' }}>Código de Verificación</InputLabel>
                <OutlinedInput
                    name="verificationCode"
                    value={formValues.verificationCode}
                    onChange={handleChange}
                    label="Código de Verificación"
                    inputProps={{ style: { color: 'white' } }}
                    sx={{
                        '& .MuiOutlinedInput-notchedOutline': {
                            borderColor: 'white',
                        },
                        '&:hover .MuiOutlinedInput-notchedOutline': {
                            borderColor: '#fa8a38',
                        },
                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                            borderColor: '#fa8a38',
                        },
                    }}
                />
            </FormControl>
            <Typography variant="h4" style={{ color: 'white', marginTop: '20px' }}>
                Regístrate en Twilio!
            </Typography>
            <Typography variant="body1" style={{ color: 'white', marginTop: '20px' }}>
                Regístrate en Twilio para recibir notificaciones de tus
                carpetas próximas a vencer o vencidas.
            </Typography>

            <Box display="flex" gap="140px" marginTop={4} justifyContent={'center'}>
                <StepGuide
                    number={1}
                    text="Escanea el siguiente código"
                    imageSrc={imageQr}
                />
                <StepGuide
                    number={2}
                    text="Envía el mensaje predefinido"
                    imageSrc={sendTwilio}
                />
            </Box>
            <Box padding="14px" justifyContent={'center'} >
                <div id="recaptcha-container"></div>
            </Box>
            <Box gap={'30px'} mt={2} display="flex" justifyContent={'center'} flexDirection="column"
                 alignItems="center">
                <Typography variant="h6" style={{ color: '#fa8a38', marginTop: '20px', fontWeight: 'bold' }}>
                    ¡Listo, ya estás registrado! Recuerda que, si no sigues estos pasos, no podrás recibir
                    notificaciones de tus carpetas por WhatsApp.
                </Typography>
                <Box mr={'123px'} display="flex" justifyContent="flex-end" width="100%">
                    <CustomButton
                        size="xs"
                        color="primary"
                        $text="Crear Cuenta Nueva"
                        onClick={handleVerifyPhone}
                        $textStyle="bold"
                    />
                </Box>
            </Box>
        </Grid>
    );
};

export default RegisterSecondPart;