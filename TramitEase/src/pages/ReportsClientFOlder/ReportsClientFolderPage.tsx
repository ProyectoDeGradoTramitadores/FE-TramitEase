import React from 'react';
import { Box, Typography } from '@mui/material';
import ClientCard from '../../shared/components/cards/ClientCard.tsx';
import BarChartComponent from '../../shared/components/Metrics/BarChartComponent.tsx';
import { useReportClientFolder } from '../../shared/hooks/useReportClientFolder.ts';
import RadarChartComponent from '../../shared/components/Metrics/RadarChartComponent.tsx';
import LineChartComponent from '../../shared/components/Metrics/LineChartComponent.tsx';
import PolarAreaChartComponent from '../../shared/components/Metrics/PolarAreaChartComponent.tsx';
import TramitReports from '../../features/metrics/TramitReports.tsx';

const ReportsClientFolderPage: React.FC = () => {
    const { totalClientFolders, tramitsByType, tramitsById, tramitsMetric } = useReportClientFolder();

    const labels = Object.keys(tramitsByType);
    const dataChart = Object.values(tramitsByType);
    const labelsTramit = Object.keys(tramitsById);
    const dataChartTramit = Object.values(tramitsById);

    const uniqueTramitsMetric = Array.from(
        new Map(tramitsMetric.map((metric) => [metric.procedureName, metric])).values()
    );

    return (
        <Box
            sx={{
                minHeight: "673px",
                minWidth: "1775px",
                marginTop: "184px",
                display: 'flex',
                backgroundColor: '#f5f5f5',
                gap: '23px',
                padding: '32px',
                flexDirection: 'column'
            }}
        >
            <Typography variant="h4" component="div" sx={{ color: 'black' }}>
                Reporte de las Carpetas del Cliente
            </Typography>
            <Box
                sx={{
                    display: 'flex',
                    backgroundColor: '#f5f5f5',
                    gap: '23px',
                    justifyContent: 'center',
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        gap: '23px',
                        flexDirection: 'column',
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            gap: '23px',
                        }}
                    >
                        <ClientCard numberFolder={totalClientFolders} />
                        <BarChartComponent
                            nameData={"Total de carpetas del Cliente"}
                            nameGraph={"Total de las carpetas del usuario por tipo"}
                            dataChart={dataChart}
                            labels={labels}
                        />
                        <RadarChartComponent
                            dataChart={dataChartTramit}
                            nameData={"Cantidad de Carpetas por Tramite"}
                            labels={labelsTramit}
                            nameGraph={"Cantidad de Carpetas del cliente segun el Tramite"}

                        />
                    </Box>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            gap: '23px',
                        }}
                    >
                        <PolarAreaChartComponent
                            nameData={"Cantidad de Carpetas por Tramite"}
                            nameGraph={"Cantidad de Carpetas del cliente por los Tramite"}
                            dataChart={dataChartTramit}
                            labels={labelsTramit}
                        />
                        <LineChartComponent
                            nameData={"Total de carpetas del Cliente"}
                            nameGraph={"Total de las carpetas del usuario por tipo"}
                            dataChart={dataChart}
                            labels={labels}
                        />
                    </Box>
                </Box>
            </Box>
            <Typography variant="h5" component="h2"  sx={{ color: 'black' }}>
                Reporte de Trámites
            </Typography>
            {uniqueTramitsMetric.map((metric, index) => (
                <TramitReports
                    key={index} procedureName={metric.procedureName} procedureType={metric.procedureType}
                    numberOfProcedures={metric.numberOfProcedures} durationDays={metric.durationDays}
                    rows={metric.rows}
                    porcentageClientFolder={metric.porcentageClientFolder}
                    porcentageTotal={metric.porcentageTotal}
                />
            ))}
        </Box>
    );
};

export default ReportsClientFolderPage;
