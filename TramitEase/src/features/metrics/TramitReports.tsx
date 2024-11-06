import React from 'react';
import { Box, Typography } from '@mui/material';
import CardTramitData from '../../shared/components/cards/CardTramitData.tsx';
import ClientFolderTable from '../../shared/components/Tables/ClientFolderTable.tsx';
import { TramitReportsProps } from '../../shared/types/MetricsClientFolderProps.ts';
import BarChartComponent from '../../shared/components/Metrics/BarChartComponent.tsx';
import ClientFolderStatusCard from '../ClientFolder/reportClient/ClientFolderStatusCard.tsx';

const TramitReports: React.FC<TramitReportsProps> = ({
                                                         procedureName,
                                                         procedureType,
                                                         numberOfProcedures,
                                                         durationDays,
                                                         porcentageClientFolder,
                                                         porcentageTotal,
                                                         rows
                                                     }) => {
    const folderNames = Object.keys(porcentageClientFolder);
    const folderPercentages = Object.values(porcentageClientFolder);

    return (
        <Box gap="1532px">
            <Typography variant="h4" sx={{ color: 'black' }}>
                {procedureName}
            </Typography>
            <Box marginBottom={"34px"} display="flex" flexDirection="row" gap="152px" alignItems="center" justifyContent="center">
                <Box gap={"12px"}>
                    <CardTramitData
                        procedureName={procedureName}
                        procedureType={procedureType}
                        numberOfProcedures={numberOfProcedures}
                        durationDays={durationDays}
                    />
                    <ClientFolderStatusCard
                        name={"Porcentaje de las Carpetas de usuario terminadas"}
                        valuePercent={porcentageTotal}
                    />
                </Box>

                <BarChartComponent nameData={'Porcentaje de avance de Carpetas de Cliente'}
                                   nameGraph={'Progreso de las carpetas del cliente'}
                                   labels={folderNames} dataChart={folderPercentages}/>

            </Box>

            <ClientFolderTable rows={rows} />
        </Box>
    );
};

export default TramitReports;
