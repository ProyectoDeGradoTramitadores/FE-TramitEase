import React from 'react';
import { DataProcedureProps } from '../../shared/types/ProgressClientProps.ts';
import { Typography } from '@mui/material';


const DataProcedure: React.FC<DataProcedureProps> = ({name, description, durationDays,
                                                             estimateDay, endDate, initialDay, Status}) => {

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Typography variant="h6">{name}</Typography>

            <div style={{ textAlign: 'left' }}>
                <Typography variant="body1">Descripción: {description}</Typography>
                <Typography variant="body1">Día de Inicio: {initialDay}</Typography>
                <Typography variant="body1">Día estimado: {estimateDay}</Typography>
                <Typography variant="body1">Día Finalización: {endDate}</Typography>
                <Typography variant="body1">Duración: {durationDays} días</Typography>
                <Typography variant="body1">Estado: {Status}</Typography>
            </div>
        </div>

    );
};

export default DataProcedure;
