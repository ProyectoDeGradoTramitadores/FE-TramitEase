import { Card, CardContent, Typography, Box } from '@mui/material';
import { CardReportProps } from '../../../shared/types/MetricsClientFolderProps.ts';
import React from 'react';

const CardInfoClientFolder: React.FC<CardReportProps> = ({ nameFolder, creationDate, endProcedure, estimateDate,
                                                                 completeTramit, delayTramit, daysDelay, daysOnTime
                                                             }) => {

    return (
        <Card sx={{ boxShadow: 1, width: '100%',
            backgroundColor: '#ffffff', color: '#000000', borderRadius:6 }}>
            <CardContent>
                <Box textAlign="center">
                    <Typography variant="h6">
                        {nameFolder}
                    </Typography>
                </Box>
                <Typography>Fecha de Inicio: {creationDate}</Typography>
                <Typography>Fecha de Finalización: {endProcedure ?? 'x'}</Typography>
                <Typography>Fecha Estimada de FInalizacion: {estimateDate}</Typography>
                <Typography>
                    Estado:
                    {completeTramit ? ' Completado' : ' En progreso'}
                </Typography>
                {completeTramit && (
                    <Typography>
                        Se completó a
                        {delayTramit ? ' con Retraso' : ' Tiempo'}
                    </Typography>
                )}
                {delayTramit && daysDelay && daysDelay > 0 && (
                    <Typography>Días de Retraso: {daysDelay} días</Typography>
                )}
                {daysOnTime && daysOnTime > 0 && (
                    <Typography>Días que sobraron para el vencimiento: {daysOnTime} días</Typography>
                )}
            </CardContent>
        </Card>
    );
};

export default CardInfoClientFolder;
