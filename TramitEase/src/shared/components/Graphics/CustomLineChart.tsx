import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { CustomLineCharProps } from '../../types/MetricsClientFolderProps.ts';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const CustomLineChart: React.FC<CustomLineCharProps> = ({ labels, dataSet }) => {
    const data = {
        labels: labels,
        datasets: dataSet,
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
            },
        },
    };

    return (
        <div style={{ width: '800px', height: '500px' }}>
            <Line data={data} options={options} />
        </div>
    );
};

export default CustomLineChart;
