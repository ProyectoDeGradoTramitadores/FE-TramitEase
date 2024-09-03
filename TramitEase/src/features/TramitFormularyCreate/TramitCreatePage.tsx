import React from 'react';
import { Box } from '@mui/material';
import TitleBreadCrumbsTramitCreate from './TitleBreadCrumbsTramitCreate.tsx';
import TramitForm from './TramitForm.tsx';
import ProcedureList from './ProcedureList.tsx';
import CustomButton from '../../shared/components/buttons/CustomButton.tsx';
import useTramitCreate from '../../shared/hooks/useTramitCreate.ts';

const TramitCreatePage: React.FC = () => {
    const {
        procedures,
        tramitId,
        name,
        selectedType,
        setTramitId,
        setName,
        setSelectedType,
        handleAddProcedure,
        handleProcedureChange,
        handleRemoveProcedure,
        handleSubmit
    } = useTramitCreate();

    return (
        <Box sx={{ backgroundColor: '#ffffff', minHeight: '690px', minWidth: '1840px',
            padding: '220px 25px 40px 40px', display: 'flex',
            flexDirection: 'column', gap: '20px' }}>
            <TitleBreadCrumbsTramitCreate />
            <TramitForm
                tramitId={tramitId}
                setTramitId={setTramitId}
                name={name}
                setName={setName}
                selectedType={selectedType}
                setSelectedType={setSelectedType}
            />
            <ProcedureList
                procedures={procedures}
                onAddProcedure={handleAddProcedure}
                onProcedureChange={handleProcedureChange}
                onRemoveProcedure={handleRemoveProcedure}
            />
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <CustomButton
                    $textStyle={"bold"}
                    $text={"Crear Tramite"}
                    size={"xs"}
                    color={"ternary"}
                    onClick={handleSubmit}
                />
            </Box>
        </Box>
    );
};

export default TramitCreatePage;
