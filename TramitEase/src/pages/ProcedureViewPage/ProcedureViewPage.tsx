import React, { useEffect } from 'react';
import { Box, Typography, Divider } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useTheme } from 'styled-components';
import { useProcedureData } from '../../shared/hooks/useProcedureData.ts';
import CustomButtonStepsProcedureGroup from '../../shared/widgets/CustomButtonStepsProcedureGroup.tsx';
import ProcedureStepsList from '../../shared/components/ProcedureViewComponent/ProcedureStepsList.tsx';

const ProcedureViewPage: React.FC = () => {
    const theme = useTheme();
    const { idProcedure } = useParams<{ idProcedure: string }>();
    const { procedure, procedureWithSteps, fetchProcedureData } = useProcedureData();

    useEffect(() => {
        if (idProcedure) {
            fetchProcedureData(parseInt(idProcedure));
        }
    }, []);

    return (
        <Box
            sx={{
                backgroundColor: 'white',
                marginTop: '150px',
                padding: '60px',
                boxShadow: 1,
                minWidth: '1800px',
                minHeight: '660px'
            }}
        >
            {procedure ? (
                <div>
                    <Typography variant="h3" color={theme.colors.ternary.default} gutterBottom>
                        {procedure.name}
                    </Typography>
                    <Typography variant="h6" color={theme.colors.secondary.default} gutterBottom>
                        Descripcion: {procedure.description}
                    </Typography>
                    <Typography variant="body1" color={theme.colors.secondary.default}>
                        Dias de Duraciòn: {procedure.dayDuring}
                    </Typography>
                    <Divider sx={{ my: 2 }} color={theme.colors.ternary.default} />
                    <Typography sx={{ mb: -3 }} variant="h5" color={theme.colors.ternary.action} gutterBottom>
                        Pasos del Procedimiento:
                    </Typography>
                    <ProcedureStepsList procedureWithSteps={procedureWithSteps}/>
                    <CustomButtonStepsProcedureGroup idProcedure={idProcedure || ''}/>
                </div>
            ) : (
                <Typography variant="body1" color="text.primary">
                    Loading Procedure...
                </Typography>
            )}
        </Box>
    );
};

export default ProcedureViewPage;
