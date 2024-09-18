import React from 'react';
import { Button } from '@mui/material';
import { CustomButtonStepProps } from '../../types/FormComponentProps.ts';
import { useTheme } from 'styled-components';

const CustomButtonStep: React.FC<CustomButtonStepProps> = ({ variant, onClick, children }) => {
    const theme = useTheme();
    return (
        <Button
            variant={variant}
            onClick={onClick}
            sx={{
                backgroundColor: theme.colors.secondary.default,
                color: '#ffffff',
                '&:hover': {
                    backgroundColor: theme.colors.secondary.hower,
                },
            }}
        >
            {children}
        </Button>
    );
};

export default CustomButtonStep;
