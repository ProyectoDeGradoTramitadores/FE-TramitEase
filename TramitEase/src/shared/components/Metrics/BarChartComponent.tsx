import React, { useMemo } from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { Card, Typography } from '@mui/material';
import { ChartMetricsProps } from '../../types/MetricsClientFolderProps.ts';
import { generateColors } from '../../hooks/useMetrics.tsx';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const BarChartComponent: React.FC<ChartMetricsProps> = ({labels, dataChart, nameGraph, nameData}) => {
    const { backgroundColors, borderColors } = useMemo(() => generateColors(labels.length), [labels.length]);

    const data = {
        labels: labels,
        datasets: [
            {
                label: nameData,
                data: dataChart,
                backgroundColor: backgroundColors,
                borderColor: borderColors,
                borderWidth: 1,
            },
        ],
    };

    const options = {
        responsive: true,
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    };

    return (
        <Card
            sx={{
                width: '600px',
                height: '400px',
                padding: '16px',
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
            <Bar data={data} options={options} />
        </Card>
    );
};

export default BarChartComponent;
