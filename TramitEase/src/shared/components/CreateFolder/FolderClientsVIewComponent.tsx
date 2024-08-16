import React from 'react';
import { Box } from '@mui/material';
import FolderClientViewComponent from './FolderClientVIewComponent.tsx';
import { FolderClientsViewComponentProps } from '../../types/FolderClientProps.ts';

const FolderClientsViewComponent: React.FC<FolderClientsViewComponentProps> = ({ clientFolders, onFolderClick }) => {
    return (
        <Box
            sx={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '90px',
                overflow: 'hidden',
            }}
        >
            {clientFolders.map((folder) => (
                <FolderClientViewComponent
                    key={folder.idClientFolder}
                    folderName={folder.name}
                    onClick={() => onFolderClick(folder.idClientFolder || 0)}
                />
            ))}
        </Box>
    );
};

export default FolderClientsViewComponent;
