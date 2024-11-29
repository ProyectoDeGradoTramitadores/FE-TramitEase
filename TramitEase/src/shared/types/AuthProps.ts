import React from 'react';

export interface RegisterFirstPartProps {
    formValues: {
        firstName: string;
        lastName: string;
        email: string;
        phone: string;
        password: string;
        confirmPassword: string;
    };
    errors: {
        email?: string;
        phone?: string;
        confirmPassword?: string;
    };
    handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleSubmit: () => void;
    navigateToLogIn: () => void;
}

export interface RegisterSecondPartProps {
    formValues: {
        verificationCode: string;
    };
    handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleVerifyPhone: () => void;
}

export interface AuthContextType {
    isAuthenticated: boolean;
    loading: boolean;
}

export interface ResetPasswordDialogProps {
    open: boolean;
    onClose: () => void;
    onReset: (email: string) => void;
}