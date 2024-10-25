import React from 'react';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';
import { ChartMetricsProps } from '../../types/MetricsClientFolderProps.ts';
import { Card } from '@mui/material';
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const LineChartComponent: React.FC<ChartMetricsProps> = ({ labels, nameGraph, dataChart, nameData }) => {
    const dataChar = {
        labels: labels,
        datasets: [{
            label: nameData,
            data: dataChart,
            fill: false,
            borderColor: 'orange',
            tension: 0.1
        }]
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: true,
                position: 'top' as const,
            },
            title: {
                display: true,
                text: nameGraph
            }
        }
    };

    return (
        <Card
            sx={{
                width: '800px',
                height: '400px',
                padding: '16px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center',
            }}
        >
            <Line data={dataChar} options={options} />
        </Card>
    );
};

export default LineChartComponent;
