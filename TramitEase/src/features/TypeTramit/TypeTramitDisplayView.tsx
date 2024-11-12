import React from 'react';
import { Box, Typography } from '@mui/material';
import TypeTramitButtons from './TypeTramitButtons';
import { TypeTramitDisplayViewProps } from '../../shared/types/TypeTramitComponentProps';

const TypeTramitDisplayView: React.FC<TypeTramitDisplayViewProps> = ({ name, handleEditClick, handleDeleteClick }) => (
    <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
        <Typography
            variant="h5"
            component="div"
            sx={{
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'normal',
                width: 'auto',
                wordBreak: 'break-word',
                color: '#ffff',
                flex: 1
            }}
        >
            {name}
        </Typography>
        <TypeTramitButtons
            onEditClick={handleEditClick}
            onDeleteClick={handleDeleteClick}
        />
    </Box>
);

export default TypeTramitDisplayView;
