import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';

interface TramitCardProps {
    nombre: string;
    tipo: string;
    numeroProcedimientos: number;
    duracion: string;
    tipoProcedimiento: string;
}

const TramitCard: React.FC<TramitCardProps> = ({ nombre, tipo, numeroProcedimientos, duracion, tipoProcedimiento }) => {
    return (
        <Card sx={{ width: '300px', margin: '16px', padding: '16px', display: 'flex',
            flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <CardContent>
                <Typography variant="h5" component="div" gutterBottom>
                    {nombre}
                </Typography>
                <Typography variant="body1" color="textSecondary">
                    Tipo de Trámite: {tipo}
                </Typography>
                <Box mt={2}>
                    <Typography variant="body2">
                        Número de Procedimientos: {numeroProcedimientos}
                    </Typography>
                </Box>
                <Box mt={1}>
                    <Typography variant="body2">
                        Duración: {duracion}
                    </Typography>
                </Box>
                <Box mt={1}>
                    <Typography variant="body2">
                        Tipo del tramite: {tipoProcedimiento}
                    </Typography>
                </Box>
            </CardContent>
        </Card>
    );
};

export default TramitCard;
