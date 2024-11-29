import React from 'react';
import { PolarArea } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    RadialLinearScale,
    ArcElement,
    Tooltip,
    Legend
} from 'chart.js';
import { ChartMetricsProps } from '../../types/MetricsClientFolderProps.ts';
import { generateColors } from '../../hooks/useMetrics.tsx';
import { Card, Typography } from '@mui/material';
ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend);

const PolarAreaChartComponent: React.FC<ChartMetricsProps> = ({ labels, dataChart, nameData, nameGraph }) => {
    const { backgroundColors, borderColors } = generateColors(dataChart.length);

    const data = {
        labels: labels,
        datasets: [{
            label: nameData,
            data: dataChart,
            backgroundColor: backgroundColors,
            borderColor: borderColors,
        }]
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
            },
            tooltip: {
                enabled: true,
            }
        }
    };

    return (
        <Card
            sx={{
                width: '400px',
                height: '400px',
                padding: '56px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center',
            }}
        >
            <Typography variant="h6" gutterBottom>
                {nameGraph}
            </Typography>
            <PolarArea data={data} options={options} />
        </Card>
    );
};

export default PolarAreaChartComponent;
