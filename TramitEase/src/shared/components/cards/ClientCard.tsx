import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { ClientCardProps } from '../../types/CardProps.tsx';

const ClientCard: React.FC<ClientCardProps> = ({ numberFolder }) => {
    return (
        <Card sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
            <CardContent>
                <Typography variant="h6" component="div">
                    Total de Carpetas del Cliente
                </Typography>
                <Typography variant="h4" component="div" sx={{ mt: 2 }}>
                    {numberFolder}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default ClientCard;
