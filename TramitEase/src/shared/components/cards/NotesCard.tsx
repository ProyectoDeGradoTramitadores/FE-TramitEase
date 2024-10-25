import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

interface NotesCardProps {
    notes: string;
}

const StyledCard = styled(Card)(({ theme }) => ({
    backgroundColor: '#f88651',
    borderRadius: theme.shape.borderRadius,
    boxShadow: theme.shadows[3],
    maxWidth: '500px',
    maxHeight: '500px',
}));

const NotesCard: React.FC<NotesCardProps> = ({ notes }) => {
    return (
        <StyledCard>
            <CardContent>
                <Typography variant="h6" gutterBottom>
                    Notas
                </Typography>
                <Typography variant="body1">
                    {notes ? notes : 'No hay notas disponibles'}
                </Typography>
            </CardContent>
        </StyledCard>
    );
};

export default NotesCard;
