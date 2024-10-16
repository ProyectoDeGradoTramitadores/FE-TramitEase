import React from 'react';
import { Box, Typography } from '@mui/material';
import { MetricsProcedureProps } from '../../../shared/types/MetricsClientFolderProps.ts';
import TableProcedure from './TableProcedure.tsx';
import BorderRadius from '../../../shared/components/Metrics/BorderRadius.tsx';
import { useStepsProcedureMetrics } from '../../../shared/hooks/useStepsProcedureMetrics.ts';
import ClientFolderStatusCard from './ClientFolderStatusCard.tsx';
import CardInfoClientFolder from './CardInfoClientFolder.tsx';

const ProcedureMetrics: React.FC<MetricsProcedureProps> = ({ nameProcedure, steps, endProcedure,
                                                           daysEstimate, complete}) => {
    const { stepNames, estimatedDays, actualDays, completedPercentage, estimatedDate,
        delayTramit, daysDelay, daysOnTime } =
        useStepsProcedureMetrics({ steps }, daysEstimate);

    return (
        <Box>
            <Typography variant="h6" gutterBottom>
                {nameProcedure}
            </Typography>
            <Box display="flex">
                <Box flex="1">
                    <BorderRadius
                        namesSteps={stepNames}
                        valuesStepsDateEstimate={estimatedDays}
                        valuesStepsDateFinished={actualDays}
                    />
                </Box>

                <Box flex="1" display="flex" flexDirection="column" gap="43px">
                    <ClientFolderStatusCard
                        name={"Estado del procedimiento"}
                        valuePercent={completedPercentage}
                    />
                    <CardInfoClientFolder
                        nameFolder={nameProcedure}
                        creationDate={steps[0].creationDate}
                        endProcedure={endProcedure?.toString() ?? "N/A"}
                        estimateDate={estimatedDate ? estimatedDate.toLocaleDateString() : "N/A"}
                        completeTramit={complete}
                        delayTramit={delayTramit}
                        daysDelay={daysDelay}
                        daysOnTime={daysOnTime}
                    />
                </Box>
            </Box>

            <TableProcedure steps={steps}/>
        </Box>
    );
};

export default ProcedureMetrics;
