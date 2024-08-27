import React from 'react';
import { IconButton } from '@mui/material';
import { Delete as DeleteIcon, Edit as EditIcon } from '@mui/icons-material';
import { TypeTramitButtonsProps } from '../../shared/types/TypeTramitComponentProps.ts';
import { ButtonTypeCustomContainer } from './TypeTramitButtons.styles.ts';

const TypeTramitButtons: React.FC<TypeTramitButtonsProps> = ({ onEditClick, onDeleteClick }) => (
    <ButtonTypeCustomContainer >
        <IconButton onClick={onEditClick} color="inherit" sx={{ marginRight: '10px' }}>
            <EditIcon sx={{ color: '#eeeeee' }} />
        </IconButton>
        <IconButton onClick={onDeleteClick} color="inherit">
            <DeleteIcon sx={{ color: '#ffffff' }} />
        </IconButton>
    </ButtonTypeCustomContainer>
);

export default TypeTramitButtons;
