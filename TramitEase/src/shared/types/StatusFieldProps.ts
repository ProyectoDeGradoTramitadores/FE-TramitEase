import React from 'react';

export interface FieldProps {
    value?: string;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void | undefined;
}

export interface TramitFieldProps extends FieldProps {
    tramitadorId?: string;
    tramitId?: string;
}