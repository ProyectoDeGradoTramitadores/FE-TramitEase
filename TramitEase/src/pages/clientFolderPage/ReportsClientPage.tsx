import { Typography, Box } from '@mui/material';
import { useMetricsClientFolder } from '../../shared/hooks/useMetricsClientFolder.ts';
import CustomLineChart from '../../shared/components/Graphics/CustomLineChart.tsx';
import CardInfoClientFolder from '../../features/ClientFolder/reportClient/CardInfoClientFolder.tsx';
import ClientFolderStatusCard from '../../features/ClientFolder/reportClient/ClientFolderStatusCard.tsx';

const ReportsClientPage = () => {
    const { clientFolder, metricsClientFolder, datesRange, dataSet } = useMetricsClientFolder();

    return (
        <Box p={4} minWidth={"1710px"} minHeight={"598px"} alignItems="center" paddingLeft={6} paddingRight={6}>
            <Typography variant="h4" gutterBottom>
                Reporte de la Carpeta del Cliente
            </Typography>

            <Box display="flex" gap={1} justifyContent="center" alignItems="center">
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 4,
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
                    <ClientFolderStatusCard valuePercent={metricsClientFolder.numberPercentComplete} />
                </Box>
                <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" width="60%">
                    <Typography variant="subtitle1" gutterBottom>
                        Avance de la Carpeta del Cliente
                    </Typography>
                    <CustomLineChart key={JSON.stringify(dataSet)} labels={datesRange ?? []} dataSet={dataSet ?? []} />
                </Box>
            </Box>
        </Box>
    );
};

export default ReportsClientPage;
