import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { sendPasswordReset, signInWithEmail, signInWithGoogle } from '../services/firebase/authService.ts';
import { useTramitadores } from './useTramitadores.ts';

const useAuth = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [openResetDialog, setOpenResetDialog] = useState(false);
    const navigate = useNavigate();
    const {tramitadores, createNewTramitador} = useTramitadores();

    const handleLogin = async () => {
        try {
            const user = await signInWithEmail(email, password);
            const tramitador = tramitadores.find(t => t.email === user.email);
            navigate(`/TramitEase/Tramitador/${tramitador?.idTramitador ?? 0}/ClientsFolder`);
        } catch (error) {
            console.error("Login error:", error);
            setError("Error: No se pudo iniciar sesión. Verifica tus credenciales e intenta de nuevo.");
        }
    };

    const handleGoogleLogin = async () => {
        try {
            const user = await signInWithGoogle();
            const tramitador = tramitadores.find(t => t.email === user.email);
            if(tramitador){
                navigate(`/TramitEase/Tramitador/${tramitador?.idTramitador}/ClientsFolder`);
            }else{
                const tramitaodrnew = await createNewTramitador({
                    idTramitador: 0,
                    name: user?.displayName ?? "",
                    phoneNumber: user.phoneNumber?? "",
                    email: user.email ?? "",
                });
                navigate(`/TramitEase/Tramitador/${tramitaodrnew?.idTramitador}/ClientsFolder`);
            }
        } catch (error) {
            console.error("Google login error:", error);
            setError("Error: No se pudo iniciar sesión con Google. Inténtalo de nuevo.");
        }
    };

    const handlePasswordReset = async () => {
        try {
            await sendPasswordReset(email);
            setError("Te hemos enviado un correo para restablecer tu contraseña.");
            setOpenResetDialog(false);
        } catch (error) {
            console.error("Password reset error:", error);
            setError("Error: No se pudo enviar el correo de restablecimiento. Verifica tu correo e intenta de nuevo.");
        }
    };

    return {
        isVisible,
        setIsVisible,
        email,
        setEmail,
        password,
        setPassword,
        error,
        setError,
        openResetDialog,
        setOpenResetDialog,
        handleLogin,
        handleGoogleLogin,
        handlePasswordReset,
        navigate
    };
};

export default useAuth;
