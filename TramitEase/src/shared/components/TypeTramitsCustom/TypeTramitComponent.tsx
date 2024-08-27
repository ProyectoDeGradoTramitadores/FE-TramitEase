import React from 'react';
import { TypeTramitComponentProps } from '../../types/TypeTramitComponentProps';
import { useTypeTramitLogic } from '../../hooks/useTypeTramitLogic';
import TypeTramitDialogs from '../../../features/TypeTramit/TypeTramitDialogs.tsx';
import TypeTramitDisplayView from '../../../features/TypeTramit/TypeTramitDisplayView.tsx';
import TypeTramitEditView from '../../../features/TypeTramit/TypeTramitEditView.tsx';
import { StyledBox } from './TramitTypeComponent.styles.ts';

const TypeTramitComponent: React.FC<TypeTramitComponentProps> = (props) => {
    const {
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
    } = useTypeTramitLogic({
        ...props,
        refreshList: props.refreshList,
    });

    return (
        <StyledBox>
            {isEditing ? (
                <TypeTramitEditView
                    editName={editName}
                    setEditName={setEditName}
                    handleCancelEdit={handleCancelEdit}
                    handleSaveEdit={handleSaveEdit}
                />
            ) : (
                <TypeTramitDisplayView
                    name={editName}
                    handleEditClick={handleEditClick}
                    handleDeleteClick={handleDeleteClick}
                />
            )}
            <TypeTramitDialogs
                openDeleteDialog={openDeleteDialog}
                onCloseDeleteDialog={() => setOpenDeleteDialog(false)}
                onConfirmDelete={async () => {
                    await handleConfirmDelete();
                    props.refreshList();
                }}
                openErrorDialog={openErrorDialog}
                onCloseErrorDialog={() => setOpenErrorDialog(false)}
            />
        </StyledBox>
    );
};

export default TypeTramitComponent;
