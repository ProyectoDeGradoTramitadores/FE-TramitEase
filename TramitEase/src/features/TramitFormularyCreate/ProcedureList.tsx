import React from 'react';
import { Box } from '@mui/material';
import CustomButtonAddProcedure from '../../shared/components/TramitFormularyCreate/CustomButtonAddProcedure.tsx';
import ProcedureItem from './ProcedureItem.tsx';
import { ProcedureListProps } from '../../shared/types/FormComponentProps.ts';

const ProcedureList: React.FC<ProcedureListProps> = ({ procedures, onAddProcedure, onProcedureChange, onRemoveProcedure }) => {
    return (
        <Box>
            {procedures.map((procedure, index) => (
                <ProcedureItem
                    key={index}
                    procedure={procedure}
                    index={index}
                    onChange={(updatedProcedure) => onProcedureChange(index, updatedProcedure)}
                    onRemove={() => onRemoveProcedure(index)}
                />
            ))}
            <Box sx={{ marginTop: '20px', position: 'relative' }}>
                <CustomButtonAddProcedure variant="contained" onClick={onAddProcedure}>
                    Añadir Procedimiento
                </CustomButtonAddProcedure>
            </Box>
        </Box>
    );
};

export default ProcedureList;
