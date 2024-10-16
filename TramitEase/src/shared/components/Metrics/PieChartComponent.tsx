import React from "react";
import { Card, Typography } from '@mui/material';
import { PieChart } from '@mui/x-charts';
import { PieChartComponentProps } from '../../types/MetricsClientFolderProps.ts';

const PieChartComponent: React.FC<PieChartComponentProps> = ({ data, title }) => {
    return (
        <Card>
            <Typography variant="h6" component="div" align="center" gutterBottom style={{ marginTop: '20px' }}>
                {title}
            </Typography>
            <PieChart
                series={[
                    {
                        data: data,
                        innerRadius: 50,
                        outerRadius: 100,
                    },
                ]}
                width={600}
                height={300}
            />
        </Card>
    );
};

export default PieChartComponent;
