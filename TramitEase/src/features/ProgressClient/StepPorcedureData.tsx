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
        <div>
            <Typography variant="h6">{name}</Typography>
            <Typography variant="body1">
                Requerimientos: {requeriments ?? 'No requeriments available'}
            </Typography>
            <Typography variant="body1">Día de Inicio: {startDate}</Typography>
            <Typography variant="body1">
                Día de Finalización: {endDate}
            </Typography>
            <Typography variant="body1">
                Día estimado de Finalización: {estimate}
            </Typography>
            <Typography variant="body1">
                Días de Duración: {dayDuRING ?? 0} days
            </Typography>
        </div>
    );
};

export default StepProcedureData;
