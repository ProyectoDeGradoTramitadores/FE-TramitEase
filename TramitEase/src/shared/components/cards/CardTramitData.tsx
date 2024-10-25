import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { CardTramitDataProps } from '../../types/MetricsClientFolderProps.ts';

const CardTramitData: React.FC<CardTramitDataProps> = ({
                                                           procedureName,
                                                           procedureType,
                                                           numberOfProcedures,
                                                           durationDays,
                                                       }) => {
    return (
        <Card variant="outlined" style={{ margin: '16px' }}>
            <CardContent>
                <Typography variant="h6" component="div">
                    {procedureName}
                </Typography>
                <Typography color="text.secondary">
                    Tipo: {procedureType}
                </Typography>
                <Typography color="text.secondary">
                    Numero de Procedimientos: {numberOfProcedures}
                </Typography>
                <Typography color="text.secondary">
                    Duracion en Dias: {durationDays}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default CardTramitData;
