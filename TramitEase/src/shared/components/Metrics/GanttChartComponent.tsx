import React, { useEffect, useState } from "react";
import { Card, Typography } from '@mui/material';
import { GanttChartComponentProps } from '../../types/MetricsClientFolderProps.ts';

const GanttChartComponent: React.FC<GanttChartComponentProps> = ({ title, tasks }) => {
    const [colors, setColors] = useState<string[]>([]);
    const [dateRange, setDateRange] = useState<{ start: Date; end: Date } | null>(null);

    useEffect(() => {
        const startDates = tasks.map(task => task.start);
        const endDates = tasks.map(task => task.end);
        const minStartDate = new Date(Math.min(...startDates.map(date => date.getTime())));
        const maxEndDate = new Date(Math.max(...endDates.map(date => date.getTime())));
        setDateRange({ start: minStartDate, end: maxEndDate });
    }, [tasks]);

    const getWidth = (start: Date, end: Date): string => {
        if (!dateRange) return '0%';

        const totalTime = dateRange.end.getTime() - dateRange.start.getTime();
        const taskStart = start.getTime() - dateRange.start.getTime();
        const taskEnd = end.getTime() - dateRange.start.getTime();
        const taskDuration = taskEnd - taskStart;

        return `${(taskDuration / totalTime) * 100}%`;
    };

    const getRandomPastelColor = (): string => {
        const r = Math.floor(Math.random() * 128) + 127;
        const g = Math.floor(Math.random() * 128) + 127;
        const b = Math.floor(Math.random() * 128) + 127;
        return `rgb(${r}, ${g}, ${b})`;
    };

    useEffect(() => {
        const generatedColors = tasks.map(() => getRandomPastelColor());
        setColors(generatedColors);
    }, []);

    return (
        <Card sx={{ padding: '20px', minWidth: '700px', margin: '20px' }}>
            <Typography variant="h6" component="div" align="center" gutterBottom sx={{ mt: 3 }}>
                {title}
            </Typography>
            <div style={{ display: 'flex', flexDirection: 'column', padding: '10px', gap: '20px' }}>
                {tasks.map((task, index) => {
                    const duration = Math.ceil((task.end.getTime() - task.start.getTime()) / (1000 * 60 * 60 * 24));
                    const startDate = task.start.toLocaleDateString();
                    const endDate = task.end.toLocaleDateString();

                    return (
                        <div key={task.id} style={{ position: 'relative', marginBottom: '20px' }}>
                            <Typography variant="body1">
                                {task.name} ({duration > 0? duration : 1} días)
                                <br />
                                Inicio: {startDate}, Fin: {endDate}
                            </Typography>
                            <div style={{ position: 'relative', height: '25px', width: '100%', backgroundColor: '#f0f0f0', borderRadius: '5px' }}>
                                <div
                                    style={{
                                        position: 'absolute',
                                        height: '100%',
                                        backgroundColor: colors[index],
                                        width: getWidth(task.start, task.end),
                                        left: getWidth(dateRange?.start ?? new Date(), task.start),
                                        borderRadius: '5px',
                                    }}
                                />
                            </div>
                        </div>
                    );
                })}
            </div>
        </Card>
    );
};

export default GanttChartComponent;
