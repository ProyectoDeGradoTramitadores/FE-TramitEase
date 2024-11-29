import React, { useState, useEffect } from 'react';
import { Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import imageSrc from "../../shared/assets/image/LoginImage.jpeg";
import RegisterFirstPart from '../../features/register/RegisterFirstPart.tsx';
import RegisterSecondPart from '../../features/register/RegisterSecondPart.tsx';
import {
    registerWithEmail,
    setupRecaptchaVerifier,
    signInWithPhone,
} from '../../shared/services/firebase/authService.ts';
import { RecaptchaVerifier } from 'firebase/auth';
import { useTramitadores } from '../../shared/hooks/useTramitadores.ts';

const RegisterPage: React.FC = () => {
    const navigate = useNavigate();

    const [formValues, setFormValues] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
        verificationCode: '',
    });
    const [errors, setErrors] = useState({
        email: '',
        phone: '',
        confirmPassword: '',
        verificationCode: '',
    });
    const [isSecondPart, setIsSecondPart] = useState(false);
    const [recaptchaVerifier, setRecaptchaVerifier] = useState<RecaptchaVerifier>();
    const {createNewTramitador} = useTramitadores();

    useEffect(() => {
        if (isSecondPart && !recaptchaVerifier) {
            const verifier = setupRecaptchaVerifier();
            setRecaptchaVerifier(verifier);
        }
    }, [isSecondPart]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormValues(prevValues => ({ ...prevValues, [name]: value }));

        if (name === 'email') {
            setErrors(prevErrors => ({
                ...prevErrors,
                email: /\S+@\S+\.\S+/.test(value) ? '' : 'Ingrese un correo electrónico válido.'
            }));
        } else if (name === 'phone') {
            setErrors(prevErrors => ({
                ...prevErrors,
                phone: value.startsWith("+") ? '' : 'El número debe comenzar con +'
            }));
        }
    };

    const handleSubmit = async () => {
        if (formValues.password !== formValues.confirmPassword) {
            setErrors(prevErrors => ({
                ...prevErrors,
                confirmPassword: 'Las contraseñas no coinciden.'
            }));
            return;
        }

        try {
            const user = await registerWithEmail(formValues.email, formValues.password, formValues.firstName);
            console.log("User registered:", user);
            setIsSecondPart(true);
            setErrors(prevErrors => ({
                ...prevErrors,
                confirmPassword: ''
            }));
        } catch (error) {
            console.error("Registration error:", error);
            setErrors(prevErrors => ({
                ...prevErrors,
                email: 'Error al registrarse. Por favor, intente nuevamente.'
            }));
        }
    };

    const handleVerifyPhone = async () => {
        try {
            if (recaptchaVerifier) {
                await signInWithPhone(formValues.phone, recaptchaVerifier);
                const tramitadornew = await createNewTramitador({
                    idTramitador: 0,
                    name: formValues.firstName ?? "",
                    lastName: formValues.lastName ?? "",
                    phoneNumber: formValues.phone ?? "",
                    email: formValues.email ?? "",
                });
                navigate(`/Tramitador/${tramitadornew?.idTramitador}/ClientsFolder`);
            }
        } catch (error) {
            console.error("Phone verification error:", error);
            setErrors(prevErrors => ({
                ...prevErrors,
                verificationCode: 'Error en la verificación telefónica.'
            }));
        }
    };

    const navigateToLogIn = () => {
        navigate('/login');
    };

    return (
        <Grid container style={{ minHeight: '956px', backgroundColor: '#323232', minWidth: "1838px" }}>
            {isSecondPart ? (
                <RegisterSecondPart
                    formValues={formValues}
                    handleChange={handleChange}
                    handleVerifyPhone={handleVerifyPhone}
                />
            ) : (
                <RegisterFirstPart
                    formValues={formValues}
                    errors={errors}
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                    navigateToLogIn={navigateToLogIn}
                />
            )}
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

export default RegisterPage;
