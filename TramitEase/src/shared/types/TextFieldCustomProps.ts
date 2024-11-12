import React from 'react';

export interface TextFieldCustomProps {
    isRequired: boolean;
    text: string;
    value?: string;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void | undefined;
}
