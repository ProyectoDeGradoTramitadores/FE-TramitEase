import React, { useEffect, useState } from 'react';
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Select,
    MenuItem,
    CircularProgress,
    SelectChangeEvent,
} from '@mui/material';
import CustomButtonAddProcedure from '../../shared/components/TramitFormularyCreate/CustomButtonAddProcedure.tsx';
import ProcedureItem from './ProcedureItem.tsx';
import { ProcedureListProps } from '../../shared/types/FormComponentProps.ts';
import { useProcedures } from '../../shared/hooks/useProcedures.ts';
import { useStepProcedures } from '../../shared/hooks/useStepProcedures.ts';

const ProcedureList: React.FC<ProcedureListProps> = ({ procedures, onAddProcedure, onProcedureChange, onRemoveProcedure }) => {
    const [openModal, setOpenModal] = useState(false);
    const [openSelectModal, setOpenSelectModal] = useState(false);
    const [selectedProcedure, setSelectedProcedure] = useState<number | null>(null);
    const {fetchStepProceduresByProcedureId} = useStepProcedures();
    const { fetchProceduresByTramitadorId, procedures: tramitadorProcedures, loading } = useProcedures();

    useEffect(() => {
        fetchProceduresByTramitadorId(1);
    }, []);

    const handleOpenModal = () => {
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
    };

    const handleAddNewProcedure = () => {
        handleCloseModal();
        onAddProcedure();
    };

    const handleUseExistingProcedure = () => {
        handleCloseModal();
        setOpenSelectModal(true);
    };

    const handleSelectProcedure = (event: SelectChangeEvent<number>) => {
        const procedureId = event.target.value as number;
        setSelectedProcedure(procedureId);
        console.log('Selected Procedure:', tramitadorProcedures.find(p => p.idProcedure === procedureId));
        console.log("step procedure:", fetchStepProceduresByProcedureId(procedureId));
        setOpenSelectModal(false);
    };

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
                <CustomButtonAddProcedure variant="contained" onClick={handleOpenModal}>
                    Añadir Procedimiento
                </CustomButtonAddProcedure>
            </Box>

            <Dialog open={openModal} onClose={handleCloseModal}>
                <DialogTitle>Añadir Procedimiento</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        ¿Quieres añadir un nuevo procedimiento o quieres usar uno existente?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleAddNewProcedure} color="primary" variant="contained">
                        Añadir Nuevo
                    </Button>
                    <Button onClick={handleUseExistingProcedure} color="secondary" variant="contained">
                        Usar Existente
                    </Button>
                    <Button onClick={handleCloseModal}>
                        Cancelar
                    </Button>
                </DialogActions>
            </Dialog>

            <Dialog open={openSelectModal} onClose={() => setOpenSelectModal(false)}>
                <DialogTitle>Seleccionar Procedimiento</DialogTitle>
                <DialogContent>
                    {loading ? (
                        <CircularProgress />
                    ) : (
                        <Select
                            fullWidth
                            value={selectedProcedure ?? ''}
                            onChange={handleSelectProcedure}
                        >
                            {tramitadorProcedures.map(procedure => (
                                <MenuItem key={procedure.idProcedure} value={procedure.idProcedure}>
                                    {procedure.name}
                                </MenuItem>
                            ))}
                        </Select>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenSelectModal(false)}>
                        Cerrar
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default ProcedureList;
