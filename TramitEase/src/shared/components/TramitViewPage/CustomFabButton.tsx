import React from 'react';
import { Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useTheme } from 'styled-components';
import { CustomFabButtonProps } from '../../types/TramitViewProps.ts';

const CustomFabButton: React.FC<CustomFabButtonProps> = ({ onClick }) => {
    const theme = useTheme();

    return (
        <Fab
            sx={{
                backgroundColor: theme.colors.ternary.default,
                color: 'white',
                '&:hover': {
                    backgroundColor: theme.colors.ternary.hower,
                },
            }}
            onClick={onClick}
        >
            <AddIcon />
        </Fab>
    );
};

export default CustomFabButton;
