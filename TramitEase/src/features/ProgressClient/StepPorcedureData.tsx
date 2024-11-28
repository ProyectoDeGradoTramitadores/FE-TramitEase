import { Typography } from '@mui/material';
import { ProcedureStepDataProps } from '../../shared/types/ProgressClientProps.ts';
import React from 'react';


const StepProcedureData: React.FC<ProcedureStepDataProps> = ({
                                                                   name,
                                                                   requeriments,
                                                                   startDate,
                                                                   endDate,
                                                                   estimate,
                                                                   dayDuRING,
                                                               }) => {
    return (
        <div style={{maxWidth: '600'}}>
            <Typography variant="h6">{name}</Typography>
            <Typography variant="body1">
                Requerimientos: {requeriments ?? 'No requeriments available'}
            </Typography>
            <Typography variant="body1">Día de Inicio:
                {startDate && startDate !== "" ? startDate : "Todavía no se inicializo el paso"}</Typography>
            <Typography variant="body1">
                Día de Finalización: {endDate? endDate : (startDate? "Paso en progreso" :
                "Todavía no se inicializo el paso")}
            </Typography>
            <Typography variant="body1">
                Día estimado de Finalización: {estimate && estimate != "N/A" ? estimate : "Todavía no se inicializo el paso"}
            </Typography>
            <Typography variant="body1">
                Días de Duración: {dayDuRING ?? 0} days
            </Typography>
        </div>
    );
};

export default StepProcedureData;
