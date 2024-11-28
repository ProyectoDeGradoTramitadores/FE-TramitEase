import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import { ClientCardViewProps } from '../../types/CardProps.ts';
import { useNavigate } from 'react-router-dom';

const CardClientView: React.FC<ClientCardViewProps> = ({ name, ci, keyClient, lastName }) => {
    const navigate = useNavigate();

    const handleCardClick = () => {
        navigate(`${keyClient}/viewClient`);
    };

    return (
        <Card onClick={handleCardClick} style={{
            width: 400,
            padding: "23px",
            backgroundColor: '#353333',
            display: 'flex',
            alignItems: 'center',
            borderRadius: '53px',
            cursor: 'pointer'
        }}>
            <Box display="flex" alignItems="center" justifyContent="center" padding={2}>
                <PersonIcon style={{ fontSize: 120, color: '#fd6214' }} />
            </Box>
            <CardContent>
                <Typography variant="h5" color="#fffcfc">
                    {name} {lastName}
                </Typography>
                <Typography variant="body1" color="#fffcfc">
                    CI: {ci}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default CardClientView;
