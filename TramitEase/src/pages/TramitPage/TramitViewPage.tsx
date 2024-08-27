import React, { useEffect } from 'react';
import { Box, Typography, Divider } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useTramitData } from '../../shared/hooks/useTramitData.ts';
import { useTheme } from 'styled-components';
import CustomButtonGroup from '../../shared/widgets/CustomButtonGroup.tsx';
import ProceduresList from '../../shared/components/TramitViewComponent/ProceduresList.tsx';

const TramitViewPage: React.FC = () => {
    const theme = useTheme();
    const { idTramit } = useParams<{ idTramit: string }>();
    const { tramit, typeTramit, procedures, proceduresWithSteps, fetchTramitData } = useTramitData();

    useEffect(() => {
        if (idTramit) {
            fetchTramitData(parseInt(idTramit));
        }
    }, [idTramit, fetchTramitData]);

    return (
        <Box
            sx={{
                backgroundColor: 'white',
                marginTop: '150px',
                padding: '60px',
                boxShadow: 1,
                minWidth: '1785px',
            }}
        >
            {tramit ? (
                <div>
                    <Typography variant="h2" color={theme.colors.ternary.default} gutterBottom>
                        {tramit.name}
                    </Typography>
                    <Typography variant="h5" color={theme.colors.secondary.default} gutterBottom>
                        Tipo del Tramite: {typeTramit?.name}
                    </Typography>
                    <Typography variant="body1" color={theme.colors.secondary.default}>
                        Dias de Duraciòn: {tramit.dayDuring}
                    </Typography>
                    <Divider sx={{ my: 2 }} color={theme.colors.ternary.default} />
                    <Typography sx={{ mb: -3 }} variant="h5" color={theme.colors.ternary.action} gutterBottom>
                        Procedimientos:
                    </Typography>
                    <ProceduresList procedures={procedures} proceduresWithSteps={proceduresWithSteps} />
                    <CustomButtonGroup idTramit={idTramit || ''}/>
                </div>
            ) : (
                <Typography variant="body1" color="text.primary">
                    Loading Tramit...
                </Typography>
            )}
        </Box>
    );
};

export default TramitViewPage;
