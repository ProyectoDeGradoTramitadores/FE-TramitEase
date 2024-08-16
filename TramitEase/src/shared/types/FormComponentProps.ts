import React from 'react';

export interface FormFieldProps {
    label: string;
    isRequired: boolean;
    value?: string;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface FormComponentProps {
    onFormChange: () => void;
}
