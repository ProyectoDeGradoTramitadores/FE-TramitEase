import React from 'react';
import {
    Box,
    Typography,
    Grid,
    FormControl,
    InputLabel,
    OutlinedInput,
    InputAdornment,
    IconButton,
    Button,
    Divider,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import GoogleIcon from '@mui/icons-material/Google';
import TextFieldCustom from '../../shared/components/TextFIeldCustom/TextFieldCustom.tsx';
import CustomButton from '../../shared/components/buttons/CustomButton.tsx';
import ResetPasswordDialog from '../../shared/components/auth/ResetPasswordDialog.tsx';
import imageSrc from "../../shared/assets/image/LoginImage.jpeg";
import useAuth from '../../shared/hooks/useAuth.ts';

const LoginPage: React.FC = () => {
    const {
        isVisible,
        setIsVisible,
        setEmail,
        setPassword,
        error,
        openResetDialog,
        setOpenResetDialog,
        handleLogin,
        handleGoogleLogin,
        handlePasswordReset,
        navigate
    } = useAuth();


    return (
        <Grid container style={{ minHeight: '957px', backgroundColor: '#323232', minWidth: "1838px" }}>
            <Grid item xs={6} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '20px' }}>
                <Typography variant="h4" style={{ color: 'white' }}>Hola,</Typography>
                <Typography variant="h2" style={{ fontWeight: 'bold', color: '#fa8a38' }}>
                    BIENVENIDO!
                </Typography>
                <Grid style={{ maxWidth: "640px", gap: "23px", display: 'flex', flexDirection: 'column' }}>
                    <TextFieldCustom
                        isRequired={true}
                        text={"Correo Electrónico"}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <FormControl variant="outlined">
                        <InputLabel htmlFor={"outlined-adornment-password"} style={{ color: 'white' }}>
                            Contraseña
                        </InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-password"
                            type={isVisible ? "text" : "password"}
                            onChange={(e) => setPassword(e.target.value)}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton onClick={() => setIsVisible(!isVisible)} edge="end">
                                        {isVisible ? <Visibility sx={{ color: 'white' }} /> : <VisibilityOff sx={{ color: 'white' }} />}
                                    </IconButton>
                                </InputAdornment>
                            }
                            label="Contraseña"
                            inputProps={{ style: { color: 'white' } }}
                        />
                    </FormControl>
                </Grid>

                {error && <Typography color="error">{error}</Typography>}

                <Box width={600} gap={2} mt={2} display="flex" flexDirection="column" alignItems="center">
                    <Button
                        variant="outlined"
                        color="secondary"
                        startIcon={<GoogleIcon />}
                        onClick={handleGoogleLogin}
                        sx={{
                            width: '100%',
                            justifyContent: 'center',
                            borderColor: '#fa8a38',
                            color: '#fa8a38',
                            '&:hover': {
                                backgroundColor: '#e48645',
                                borderColor: '#c67b41',
                                color: 'white',
                            },
                        }}
                    >
                        Iniciar sesión con Google
                    </Button>
                    <Divider style={{ width: '100%', margin: '10px 0', backgroundColor: 'gray' }} />
                    <Button
                        color="primary"
                        onClick={() => setOpenResetDialog(true)}
                        style={{ textAlign: 'center', color: 'white' }}
                    >
                        ¿Olvidaste tu contraseña?
                    </Button>
                    <Box display="flex" gap={30} justifyContent="space-between" marginTop={2} width="100%">
                        <CustomButton size={"xs"} color={"primary"} $text={"Ingresar"} $textStyle={"normal"} onClick={handleLogin} />
                        <CustomButton size={"xs"} color={"ternary"} $text={"Registrarse"}
                                      $textStyle={"normal"} onClick={() => navigate('/Register')} />
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

            <ResetPasswordDialog
                open={openResetDialog}
                onClose={() => setOpenResetDialog(false)}
                onReset={handlePasswordReset}
            />
        </Grid>
    );
};

export default LoginPage;
