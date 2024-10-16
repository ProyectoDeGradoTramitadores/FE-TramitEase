import { Card, Typography, Stack } from '@mui/material';
import { BarChart } from '@mui/x-charts';
import { BorderRadiusProps } from '../../types/MetricsClientFolderProps.ts';
import React from 'react';

const BorderRadius: React.FC<BorderRadiusProps> = ({ namesSteps, valuesStepsDateFinished,
                                                       valuesStepsDateEstimate }) => {
    return (
        <Card style={{
            maxWidth: 800,
            height: 500,
            overflow: 'visible',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 8
        }}>
            <Typography variant="h6" sx={{ mt: 2 }}>
                Comparativa de Fechas de Finalización Y Estimado para cada Paso
            </Typography>
            <Stack direction="row" spacing={2} sx={{ mt: 2, justifyContent: 'center', marginTop: 4 }}>
                <Stack direction="row" spacing={1} alignItems="center">
                    <div style={{ width: 20, height: 20, backgroundColor: '#e66728' }} />
                    <Typography>Serie 1: Fecha de Finalización</Typography>
                </Stack>
                <Stack direction="row" spacing={1} alignItems="center">
                    <div style={{ width: 20, height: 20, backgroundColor: '#373737' }} />
                    <Typography>Serie 2: Fecha estimada de Finalización</Typography>
                </Stack>
            </Stack>
            <BarChart
                xAxis={[{
                    scaleType: 'band',
                    data: namesSteps,
                }]}
                series={[
                    { data: valuesStepsDateFinished, color: '#e66728' },
                    { data: valuesStepsDateEstimate, color: '#373737' },
                ]}
                width={700}
                height={400}
            />
        </Card>
    );
};

export default BorderRadius;

