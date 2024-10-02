import React from 'react';
import { Box } from '@mui/material';
import CustomButton from '../../shared/components/buttons/CustomButton.tsx';
import TitleBreadCrumbsProcedureCreate
    from '../../features/ProcedureFormularyCreate/TitleBreadCrumbsProcedureCreate.tsx';
import useProcedureCreate from '../../shared/hooks/useProcedureCreate.ts';
import ProcedureItemFormulary from '../../features/ProcedureFormularyCreate/ProcedureItemFormulary.tsx';

const ProcedureCreatePage: React.FC = () => {
    const {
        procedure,
        handleSubmit,
        handleAddProcedure,
    } = useProcedureCreate();

    return (
        <Box sx={{ backgroundColor: '#ffffff', minHeight: '690px', minWidth: '1774px',
            padding: '220px 25px 40px 40px', display: 'flex',
            flexDirection: 'column', gap: '20px' }}>
            <TitleBreadCrumbsProcedureCreate />
            {procedure && (
                <ProcedureItemFormulary
                    procedure={procedure}
                    onChange={(updatedProcedure) => handleAddProcedure(updatedProcedure)}
                />
            )}
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <CustomButton
                    $textStyle={"bold"}
                    $text={"Crear Procedure"}
                    size={"xs"}
                    color={"ternary"}
                    onClick={handleSubmit}
                />
            </Box>
        </Box>
    );
};

export default ProcedureCreatePage;
