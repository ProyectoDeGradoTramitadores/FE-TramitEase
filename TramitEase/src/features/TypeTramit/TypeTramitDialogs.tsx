import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@mui/material';
import { TypeTramitDialogsProps } from '../../shared/types/TypeTramitComponentProps.ts';
import CustomButton from '../../shared/components/buttons/CustomButton.tsx';

const TypeTramitDialogs: React.FC<TypeTramitDialogsProps> = ({
                                                                 openDeleteDialog,
                                                                 onCloseDeleteDialog,
                                                                 onConfirmDelete,
                                                                 openErrorDialog,
                                                                 onCloseErrorDialog
                                                             }) => (
    <>
        <Dialog open={openDeleteDialog} onClose={onCloseDeleteDialog}>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogContent>
                <Typography>¿Estas Seguro de eliminar este tipo de Tramite?</Typography>
            </DialogContent>
            <DialogActions>
                <CustomButton color={"secondary"} $text={"Cancelar"}
                              $textStyle={'bold'} size={'xs'} onClick={onCloseDeleteDialog}/>
                <CustomButton color={"ternary"} $text={"Eliminar"}
                              $textStyle={'bold'} size={'xs'} onClick={onConfirmDelete}/>
            </DialogActions>
        </Dialog>
        <Dialog open={openErrorDialog} onClose={onCloseErrorDialog}>
            <DialogTitle>Oops!</DialogTitle>
            <DialogContent>
                <Typography>Este tipo de tramite no se puede eliminar ya que hay tramites asociados.</Typography>
            </DialogContent>
            <DialogActions>
                <CustomButton color={"ternary"} $text={"OK"}
                              $textStyle={'bold'} size={'xs'} onClick={onCloseErrorDialog}/>
            </DialogActions>
        </Dialog>
    </>
);

export default TypeTramitDialogs;
