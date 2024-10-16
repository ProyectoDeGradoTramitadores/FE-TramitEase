import React from 'react';
import {
    Box,
    Typography,
    Grid,
} from '@mui/material';
import imageSrc from "../../shared/assets/image/LoginImage.jpeg";
import TextFieldCustom from '../../shared/components/TextFIeldCustom/TextFieldCustom.tsx';
import CustomButton from '../../shared/components/buttons/CustomButton.tsx';
import { useNavigate } from 'react-router-dom';

const LoginPage: React.FC = () => {
    const navigate = useNavigate();

    const navegateTramit = () => {
        navigate('/TramitEase/Tramitador/1/ClientsFolder');
    }
    return (
        <Grid container style={{ minHeight: '926px', backgroundColor: '#323232', minWidth: "1838px" }}>
            <Grid item xs={6} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '20px' }}>
                <Typography variant="h4">Hola,</Typography>
                <Typography variant="h2" style={{ fontWeight: 'bold', color: '#fa8a38' }}>
                    BIENVENIDO!
                </Typography>
                <Grid  style={{maxWidth:"640px", gap: "23px" ,
                    display: 'flex', flexDirection: 'column' }}>
                    <TextFieldCustom isRequired={true} text={"Correo Electronico"} />
                    <TextFieldCustom isRequired={true} text={"Contraseña"} />
                </Grid>

                <Box width={600} gap={5} display="flex" flexDirection="column" alignItems="center">
                    <Box display="flex" gap={30} justifyContent="space-between" marginTop={2} width="100%">
                        <CustomButton size={"xs"} color={"primary"}
                                      $text={"Ingresar"} $textStyle={"normal"}  onClick={navegateTramit}/>
                        <CustomButton size={"xs"} color={"ternary"} $text={"Registrarse"} $textStyle={"normal"} />
                    </Box>
                </Box>
            </Grid>
            <Grid item xs={6}>
                <img
                    src={imageSrc}
                    alt="Logo"
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                    }}
                />
            </Grid>
        </Grid>
    );
};

export default LoginPage;
