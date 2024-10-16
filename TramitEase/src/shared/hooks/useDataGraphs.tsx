import { useMemo } from 'react';
import { MetricsProcedureProps, PieChartData, Task } from '../types/MetricsClientFolderProps.ts';

const generateRandomColor = (): string => {
    const isOrange = Math.random() > 0.5;
    let h: number, s: number, l: number;

    if (isOrange) {
        h = Math.floor(Math.random() * 20) + 20;
        s = Math.floor(Math.random() * 50) + 50;
        l = Math.floor(Math.random() * 30) + 40;
    } else {
        h = 0;
        s = Math.floor(Math.random() * 20) + 10;
        l = Math.floor(Math.random() * 40) + 50;
    }
    return `hsl(${h}, ${s}%, ${l}%)`;
};

export const useDataGraphs = (procedureFolderClients:  MetricsProcedureProps[] ): PieChartData[] => {
    return useMemo(() => {
        const chartData: PieChartData[] = procedureFolderClients.map((proc, index) => {
            const completeStepsProcedure = proc.steps.filter(p => p.completeStep).length;
            const percentage = proc.complete?  100 : (completeStepsProcedure / proc.steps.length) * 100;

            return {
                id: index,
                value: percentage,
                label: proc.nameProcedure,
                color: generateRandomColor()
            };
        });

        return chartData;
    }, [procedureFolderClients]);
};

const calculateEndDate = (startDate: Date, duration: number): Date => {
    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + duration);
    return endDate;
};

export const useGanttChart = (procedureFolderClients:  MetricsProcedureProps[] ): Task[] => {
    return useMemo(() => {
        const chartData: Task[] = procedureFolderClients.map((proc, index) => {
            const startDate = new Date(proc.steps[0]?.creationDate) || new Date();
            const duration = proc.daysEstimate || 0;
            const endDate = calculateEndDate(startDate, duration);

            return {
                id: index,
                name: proc.nameProcedure,
                start: new Date(proc.steps[0].creationDate),
                end: proc.complete? new Date(proc.endProcedure ?? '') : endDate,
            };
        });

        return chartData;
    }, [procedureFolderClients]);
};