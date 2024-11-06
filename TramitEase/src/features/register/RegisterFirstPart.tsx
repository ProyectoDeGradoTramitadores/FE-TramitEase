import React, { useState } from 'react';
import {
    Box,
    Typography,
    Grid,
    FormControl,
    InputLabel,
    OutlinedInput,
    InputAdornment,
    IconButton,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import CustomButton from '../../shared/components/buttons/CustomButton.tsx';
import { RegisterFirstPartProps } from '../../shared/types/AuthProps.ts';

const RegisterFirstPart: React.FC<RegisterFirstPartProps> = ({
                                                                 formValues,
                                                                 errors,
                                                                 handleChange,
                                                                 handleSubmit,
                                                                 navigateToLogIn,
                                                             }) => {
    const [isVisible, setIsVisible] = useState(false);
    const [isConfirmVisible, setIsConfirmVisible] = useState(false);

    return (
        <Grid item xs={6} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '20px' }}>
            <Typography variant="h4" style={{ color: 'white' }}>TramitEase</Typography>
            <Typography variant="h2" style={{ fontWeight: 'bold', color: '#fa8a38' }}>
                Crea una Cuenta
            </Typography>
            <Grid style={{ maxWidth: "640px", gap: "23px", display: 'flex', flexDirection: 'column' }}>
                <FormControl variant="outlined" margin="normal">
                    <InputLabel style={{ color: 'white' }}>Nombre</InputLabel>
                    <OutlinedInput
                        name="firstName"
                        value={formValues.firstName}
                        onChange={handleChange}
                        label="Nombre"
                        inputProps={{ style: { color: 'white' } }}
                    />
                </FormControl>

                <FormControl variant="outlined" margin="normal">
                    <InputLabel style={{ color: 'white' }}>Apellido</InputLabel>
                    <OutlinedInput
                        name="lastName"
                        value={formValues.lastName}
                        onChange={handleChange}
                        label="Apellido"
                        inputProps={{ style: { color: 'white' } }}
                    />
                </FormControl>

                <FormControl variant="outlined" margin="normal">
                    <InputLabel style={{ color: 'white' }}>Correo Electrónico</InputLabel>
                    <OutlinedInput
                        name="email"
                        value={formValues.email}
                        onChange={handleChange}
                        error={!!errors.email}
                        label="Correo Electrónico"
                        inputProps={{ style: { color: 'white' } }}
                    />
                    {errors.email && <Typography color="error">{errors.email}</Typography>}
                </FormControl>

                <FormControl variant="outlined" margin="normal">
                    <InputLabel style={{ color: 'white' }}>Teléfono</InputLabel>
                    <OutlinedInput
                        name="phone"
                        value={formValues.phone}
                        onChange={handleChange}
                        error={!!errors.phone}
                        label="Teléfono"
                        inputProps={{ style: { color: 'white' }, pattern: "^\\+" }}
                    />
                    {errors.phone && <Typography color="error">{errors.phone}</Typography>}
                </FormControl>

                <FormControl variant="outlined" margin="normal">
                    <InputLabel style={{ color: 'white' }}>Contraseña</InputLabel>
                    <OutlinedInput
                        name="password"
                        type={isVisible ? "text" : "password"}
                        value={formValues.password}
                        onChange={handleChange}
                        label="Contraseña"
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton onClick={() => setIsVisible(!isVisible)} edge="end">
                                    {isVisible ? <Visibility sx={{ color: 'white' }} /> : <VisibilityOff sx={{ color: 'white' }} />}
                                </IconButton>
                            </InputAdornment>
                        }
                        inputProps={{ style: { color: 'white' } }}
                    />
                </FormControl>

                <FormControl variant="outlined" margin="normal">
                    <InputLabel style={{ color: 'white' }}>Confirmar Contraseña</InputLabel>
                    <OutlinedInput
                        name="confirmPassword"
                        type={isConfirmVisible ? "text" : "password"}
                        value={formValues.confirmPassword}
                        onChange={handleChange}
                        label="Confirmar Contraseña"
                        error={!!errors.confirmPassword}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton onClick={() => setIsConfirmVisible(!isConfirmVisible)} edge="end">
                                    {isConfirmVisible ? <Visibility sx={{ color: 'white' }} /> : <VisibilityOff sx={{ color: 'white' }} />}
                                </IconButton>
                            </InputAdornment>
                        }
                        inputProps={{ style: { color: 'white' } }}
                    />
                    {errors.confirmPassword && <Typography color="error">{errors.confirmPassword}</Typography>}
                </FormControl>
            </Grid>

            <Box width={640} gap={2} display="flex" flexDirection="column" alignItems="center">
                <Box display="flex" gap={30} justifyContent="space-between" marginTop={2} width="100%">
                    <CustomButton size="xs" color="primary" $text="Siguiente" $textStyle="normal" onClick={handleSubmit} />
                    <CustomButton size="xs" color="ternary" $text="Iniciar Sesión" $textStyle="normal" onClick={navigateToLogIn} />
                </Box>
            </Box>
        </Grid>
    );
};

export default RegisterFirstPart;
