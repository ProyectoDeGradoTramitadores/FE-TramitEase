import { TypeTramit } from '../../entities/TypeTramit.ts';
import React from 'react';

export interface TypeTramitComponentProps {
    name: string;
    idTypeTramit: number;
    idTramitador: number;
    refreshList: () => void;
}

export interface TypeTramitListComponentProps {
    typeTramits: TypeTramit[];
    refreshList: () => void;
}

export interface CustomButtonStepsGroupProps {
    idProcedure: string;
}

export interface TypeTramitDialogsProps {
    openDeleteDialog: boolean;
    onCloseDeleteDialog: () => void;
    onConfirmDelete: () => void;
    openErrorDialog: boolean;
    onCloseErrorDialog: () => void;
}

export interface TypeTramitButtonsProps {
    onEditClick: () => void;
    onDeleteClick: () => void;
}

export interface TypeTramitEditViewProps {
    editName: string;
    setEditName: React.Dispatch<React.SetStateAction<string>>;
    handleCancelEdit: () => void;
    handleSaveEdit: () => void;
}

export interface TypeTramitCreateViewProps {
    newName: string;
    setNewName: React.Dispatch<React.SetStateAction<string>>;
    handleCancelCreate: () => void;
    handleSaveCreate: () => void;
}

export interface TypeTramitDisplayViewProps {
    name: string;
    handleEditClick: () => void;
    handleDeleteClick: () => void;
}