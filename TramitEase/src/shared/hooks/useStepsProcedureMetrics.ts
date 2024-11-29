import { useMemo } from 'react';
import { TableProcedureProps } from '../types/MetricsClientFolderProps.ts';

export const useStepsProcedureMetrics = (steps: TableProcedureProps, daysEstimate: number) => {
    const { steps: stepList } = steps;
    console.log('useStepsProcedureMetrics', steps);

    const estimatedDate = useMemo(() => {
        const creationDate = new Date(stepList[0].creationDate);
        const estimateDate = new Date(creationDate);
        estimateDate.setDate(creationDate.getDate() + daysEstimate);
        return estimateDate;
    }, [stepList, daysEstimate]);

    const stepNames = useMemo(() => {
        return stepList.map(step => step.nameStep);
    }, [stepList]);

    const estimatedDays = useMemo(() => {
        return stepList.map(step => {
            const estimateDate = new Date(step.estimateDate);
            const creationDate = new Date(step.creationDate);
            return Math.round((estimateDate.getTime() - creationDate.getTime()) / (1000 * 60 * 60 * 24));
        });
    }, [stepList]);

    const completedPercentage = useMemo(() => {
        const completedSteps = stepList.filter(step => step.completeStep).length;
        return (completedSteps / stepList.length) * 100;
    }, [stepList]);

    const actualDays = useMemo(() => {
        return stepList.map(step => {
            const estimateDate = new Date(step.endDate);
            const creationDate = new Date(step.creationDate);
            const result = Math.round((estimateDate.getTime() - creationDate.getTime()) / (1000 * 60 * 60 * 24));
            return result > 0? result : 1;
        });
    }, [stepList]);

    const totalDaysDelay = useMemo(() => {
        const total = 0;

        return stepList.reduce((_index, step) => {
            const endDate = new Date(step.endDate);
            if (endDate > new Date(estimatedDate)) {
                return total + Math.round((endDate.getTime() - estimatedDate.getTime()) / (1000 * 60 * 60 * 24));
            }
            return total;
        }, 0);
    }, [stepList, estimatedDate]);

    const totalDaysOnTime = useMemo(() => {
        const total = 0;
            return stepList.reduce((_index, step) => {
            const endDate = new Date(step?.endDate);

            if (endDate.getTime() <= new Date(estimatedDate).getTime()) {
                return total + Math.round((new Date(estimatedDate).getTime() - endDate.getTime()) / (1000 * 60 * 60 * 24));
            }
            return total;
        }, 0);
    }, [stepList, estimatedDate]);


    const delayTramit = totalDaysDelay > 0;

    return {
        stepNames,
        actualDays,
        estimatedDays,
        completedPercentage,
        estimatedDate,
        delayTramit,
        daysDelay: totalDaysDelay,
        daysOnTime: totalDaysOnTime,
    };
};
