import React from 'react';
import { Box, Typography } from '@mui/material';
import FolderIcon from '@mui/icons-material/Folder';
import { useTheme } from 'styled-components';
import { FolderClientViewComponentProps } from '../../types/FolderClientProps.ts';

const FolderClientViewComponent: React.FC<FolderClientViewComponentProps> = ({ folderName, onClick }) => {
    const theme = useTheme();
    return (
        <Box
            onClick={onClick}
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-start',
                backgroundColor: theme.colors.secondary.default,
                borderRadius: '1cm',
                width: '300px',
                height: '80px',
                padding: '20px',
                transition: 'background-color 0.3s ease',
                '&:hover': {
                    backgroundColor: theme.colors.primary.hower,
                },
                '&:active': {
                    backgroundColor: theme.colors.primary.action,
                },
            }}
        >
            <FolderIcon
                sx={{
                    fontSize: '5rem',
                    color: theme.colors.ternary.default,
                    marginRight: '10px',
                }}
            />
            <Typography
                variant="h5"
                sx={{
                    color: theme.colors.shades.white,
                    textAlign: 'left',
                    flex: 1,
                }}
            >
                {folderName}
            </Typography>
        </Box>
    );
};

export default FolderClientViewComponent;
