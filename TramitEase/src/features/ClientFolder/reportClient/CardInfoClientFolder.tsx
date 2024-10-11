import { Card, CardContent, Typography, Box } from '@mui/material';
import { CardReportProps } from '../../../shared/types/MetricsClientFolderProps.ts';
import React from 'react';

const ReportsClientPage: React.FC<CardReportProps> = ({ nameFolder, creationDate, endProcedure, estimateDate,
                                                                 completeTramit, delayTramit, daysDelay, daysOnTime
                                                             }) => {
    return (
        <Card sx={{ boxShadow: 1, width: '100%',
            backgroundColor: '#ededed', color: '#000000' }}>
            <CardContent>
                <Box textAlign="center">
                    <Typography variant="h6">
                        Nombre de la Carpeta: {nameFolder}
                    </Typography>
                </Box>
                <Typography>Inicio de la Carpeta: {creationDate}</Typography>
                <Typography>Finalización de la Carpeta: {endProcedure ?? 'x'}</Typography>
                <Typography>Fecha Estimada: {estimateDate}</Typography>
                <Typography>
                    Estado de la carpeta del cliente:
                    {completeTramit ? ' Completado' : ' En progreso'}
                </Typography>
                {completeTramit && (
                    <Typography>
                        La carpeta del cliente se completó a
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

export default ReportsClientPage;
