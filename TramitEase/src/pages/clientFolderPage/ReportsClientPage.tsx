import { Typography, Box } from '@mui/material';
import { useMetricsClientFolder } from '../../shared/hooks/useMetricsClientFolder.ts';
import CustomLineChart from '../../shared/components/Graphics/CustomLineChart.tsx';
import CardInfoClientFolder from '../../features/ClientFolder/reportClient/CardInfoClientFolder.tsx';
import ClientFolderStatusCard from '../../features/ClientFolder/reportClient/ClientFolderStatusCard.tsx';
import ProcedureMetrics from '../../features/ClientFolder/reportClient/ProcedureMetrics.tsx';
import PieChartComponent from '../../shared/components/Metrics/PieChartComponent.tsx';
import { useDataGraphs, useGanttChart } from '../../shared/hooks/useDataGraphs.tsx';
import GanttChartComponent from '../../shared/components/Metrics/GanttChartComponent.tsx';

const ReportsClientPage = () => {
    const { clientFolder, metricsClientFolder, datesRange, dataSet,
        metricsProcedures } = useMetricsClientFolder();
    const data = useDataGraphs(metricsProcedures);

    const tasks = useGanttChart(metricsProcedures);

    return (
        <Box p={4} minWidth={"1710px"} minHeight={"598px"} alignItems="center" paddingLeft={6} paddingRight={6}>
            <Box>
                <Typography variant="h4" gutterBottom>
                    Reporte de la Carpeta del Cliente
                </Typography>

                <Box display="flex" gap={1} justifyContent="center" alignItems="center">
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 4,
                            width: '40%',
                        }}
                    >
                        <CardInfoClientFolder
                            nameFolder={clientFolder?.name ?? ''}
                            creationDate={clientFolder?.creationDate ?? ''}
                            endProcedure={metricsClientFolder.endActuallyProcedure?.toString() ?? 'x'}
                            estimateDate={clientFolder?.endDate ?? ''}
                            completeTramit={metricsClientFolder.completeTramit}
                            delayTramit={metricsClientFolder.delayTramit}
                            daysDelay={metricsClientFolder.daysDelay}
                            daysOnTime={metricsClientFolder.daysOnTime}
                        />
                        <ClientFolderStatusCard
                            name={"Estado de la carpeta del cliente"}
                            valuePercent={metricsClientFolder.numberPercentComplete}
                        />
                    </Box>
                    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" width="60%">
                        <Typography variant="subtitle1" gutterBottom>
                            Avance de la Carpeta del Cliente
                        </Typography>
                        <CustomLineChart key={JSON.stringify(dataSet)} labels={datesRange ?? []} dataSet={dataSet ?? []} />
                    </Box>
                </Box>
                <Box mt={4} display="flex" justifyContent="center" alignItems="center" gap={23}>
                    <Box sx={{ width: 600, height: 400 }}>
                        <PieChartComponent title={"Porcentajes de Completado de los Procedimientos"} data={data} />
                    </Box>
                    <Box>
                        <GanttChartComponent title={"Tiempos de Cada Procedimiento"} tasks={tasks}/>
                    </Box>
                </Box>

            </Box>
            <Box>
                <Typography variant="h5" gutterBottom>
                    Reportes por Procedimiento
                </Typography>
                {metricsProcedures.map((procedure, index) => (
                    <ProcedureMetrics key={index} nameProcedure={procedure.nameProcedure}
                                    steps={procedure.steps} endProcedure={procedure.endProcedure}
                    complete={procedure.complete} daysEstimate={procedure.daysEstimate}/>
                ))}
            </Box>
        </Box>
    );
};

export default ReportsClientPage;
