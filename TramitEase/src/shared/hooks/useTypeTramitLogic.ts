import { useState } from 'react';
import { useTypeTramits } from './useTypeTramits';
import { useTramits } from './useTramits';
import { TypeTramitComponentProps } from '../types/TypeTramitComponentProps.ts';

export const useTypeTramitLogic = ({ name, idTypeTramit, idTramitador }: TypeTramitComponentProps) => {
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [editName, setEditName] = useState<string>(name);
    const [openDeleteDialog, setOpenDeleteDialog] = useState<boolean>(false);
    const [openErrorDialog, setOpenErrorDialog] = useState<boolean>(false);
    const { updateExistingTypeTramit, deleteExistingTypeTramit, refreshTypeTramits } = useTypeTramits();
    const { fetchTramitsByTypeId } = useTramits();

    const handleEditClick = () => setIsEditing(true);
    const handleSaveEdit = async () => {
        try {
            await updateExistingTypeTramit(idTypeTramit, { idTypeTramit, idTramitador, name: editName });
            setIsEditing(false);
        } catch (error) {
            console.error('Error updating type tramit:', error);
        }
    };
    const handleCancelEdit = () => {
        setEditName(name);
        setIsEditing(false);
    };
    const handleDeleteClick = async () => {
        const associatedTramits = await fetchTramitsByTypeId(idTypeTramit);
        associatedTramits.length > 0 ? setOpenErrorDialog(true) : setOpenDeleteDialog(true);
    };
    const handleConfirmDelete = async () => {
        try {
            await deleteExistingTypeTramit(idTypeTramit);
            setOpenDeleteDialog(false);
            refreshTypeTramits();
        } catch (error) {
            console.error('Error deleting type tramit:', error);
        }
    };

    return {
        isEditing,
        editName,
        setEditName,
        openDeleteDialog,
        openErrorDialog,
        handleEditClick,
        handleSaveEdit,
        handleCancelEdit,
        handleDeleteClick,
        handleConfirmDelete,
        setOpenDeleteDialog,
        setOpenErrorDialog
    };
};
