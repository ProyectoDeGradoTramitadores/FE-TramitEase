import React from 'react';
import {
    Chart as ChartJS,
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend,
} from 'chart.js';
import { Radar } from 'react-chartjs-2';
import { Card, Typography } from '@mui/material';
import { ChartMetricsProps } from '../../types/MetricsClientFolderProps.ts';

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);


const RadarChartComponent: React.FC<ChartMetricsProps> = ({dataChart, nameData, labels, nameGraph}) => {
    const data = {
        labels: labels,
        datasets: [{
            label: nameData,
            backgroundColor: 'rgba(54, 162, 235, 0.5)',
            borderColor: 'rgb(54, 162, 235)',
            borderWidth: 1,
            data: dataChart,
        }]
    };

    const options = {
        scales: {
            r: {
                angleLines: {
                    color: 'red',
                },
                suggestedMin: 0,
                suggestedMax: 60,
            },
        },
        responsive: true,
    };

    return (
        <Card
            sx={{
                width: '650px',
                height: '500px',
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
            <Radar data={data} options={options} />
        </Card>
    );
};

export default RadarChartComponent;
