import React from 'react';
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
    CircularProgress, IconButton,
} from '@mui/material';
import CustomButtonAddProcedure from '../../shared/components/TramitFormularyCreate/CustomButtonAddProcedure.tsx';
import ProcedureItem from './ProcedureItem.tsx';
import { ProcedureListProps } from '../../shared/types/FormComponentProps.ts';
import CustomButton from '../../shared/components/buttons/CustomButton.tsx';
import CloseIcon from '@mui/icons-material/Close';

const ProcedureList: React.FC<ProcedureListProps> = ({ procedures,
                                                         onProcedureChange,
                                                         onRemoveProcedure,
                                                         handleOpenModal,
                                                         handleCloseModal,
                                                         handleAddNewProcedure,
                                                         handleUseExistingProcedure,
                                                         handleSelectProcedure,
                                                         openModal,
                                                         openSelectModal,
                                                         loading,
                                                         selectedProcedure,
                                                         setOpenSelectModal,
                                                         tramitadorProcedures
                                                     }) => {
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
                <IconButton
                    aria-label="close"
                    onClick={handleCloseModal}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
                <DialogTitle>Añadir Procedimiento</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        ¿Quieres añadir un nuevo procedimiento o quieres usar uno existente?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <CustomButton
                        $text={"Añadir Nuevo"}
                        $textStyle={"bold"}
                        size={"s"}
                        color={"primary"}
                        onClick={handleAddNewProcedure}
                    />
                    <CustomButton
                        $text={"Usar Existente"}
                        $textStyle={"bold"}
                        size={"s"}
                        color={"ternary"}
                        onClick={handleUseExistingProcedure}
                    />
                </DialogActions>
            </Dialog>

            <Dialog open={openSelectModal} onClose={() => setOpenSelectModal(false)}>
                <DialogTitle>Seleccionar Procedimiento
                </DialogTitle>
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
