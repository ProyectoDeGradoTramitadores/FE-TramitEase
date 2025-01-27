import React from 'react';
import { DataProcedureProps } from '../../shared/types/ProgressClientProps.ts';
import { Typography } from '@mui/material';


const DataProcedure: React.FC<DataProcedureProps> = ({name, description, durationDays, endDate,
                                                             estimateDay, initialDay, Status}) => {

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Typography variant="h6">{name}</Typography>

            <div style={{ textAlign: 'left' }}>
                <Typography variant="body1">Descripción: {description}</Typography>
                <Typography variant="body1">Día de Inicio: {initialDay === "N/A" ?
                    "Todavia el Procedimiento no se inicio": initialDay}</Typography>
                <Typography variant="body1">Día de Finalizacion: {endDate === "N/A" ?
                    (initialDay === "N/A"? "Todavia el Procedimiento no se inicio" :
                        "Procedimiento en progreso") : endDate}</Typography>
                <Typography variant="body1">Día estimado: {estimateDay === "N/A" ?
                    "Todavia el Procedimiento no se inicio": estimateDay}</Typography>
                <Typography variant="body1">Duración: {durationDays} días</Typography>
                <Typography variant="body1">Estado: {Status}</Typography>
            </div>
        </div>

    );
};

export default DataProcedure;
