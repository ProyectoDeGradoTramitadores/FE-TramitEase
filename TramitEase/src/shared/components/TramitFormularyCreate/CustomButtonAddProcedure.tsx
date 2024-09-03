import React from 'react';
import { Button } from '@mui/material';
import { CustomButtonAddProps } from '../../types/FormComponentProps.ts';
import { useTheme } from 'styled-components';

const CustomButtonAddProcedure: React.FC<CustomButtonAddProps> = ({ variant, onClick, children }) => {
    const theme = useTheme();
    return (
        <Button
            variant={variant}
            onClick={onClick}
            sx={{
                backgroundColor: theme.colors.primary.default,
                color: '#ffffff',
                '&:hover': {
                    backgroundColor: theme.colors.primary.hower,
                },
            }}
        >
            {children}
        </Button>
    );
};

export default CustomButtonAddProcedure;
