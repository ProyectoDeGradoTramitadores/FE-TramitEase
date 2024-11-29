import React from 'react';
import { SelectChangeEvent } from '@mui/material';
import { Procedure } from '../../entities/Procedure.ts';

export interface FormFieldProps {
    label: string;
    isRequired: boolean;
    value?: string | number;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface FormComponentProps {
    onFormChange: () => void;
}

export interface CustomButtonAddProps {
    variant: 'contained' | 'outlined';
    onClick: () => void;
    children: React.ReactNode;
}

export interface CustomButtonStepProps {
    variant: 'contained' | 'outlined';
    onClick: () => void;
    children: React.ReactNode;
}

export interface ProcedureForm {
    id?: number;
    name: string;
    description: string;
    steps: { name: string; requirements: string; days: number; idStepProcedure?: number; }[];
}

export interface Step {
    idStepProcedure?: number;
    name: string;
    requirements: string;
    days: number;
}

export interface StepItemProps {
    step: Step;
    onChange: (updatedStep: Step) => void;
    onRemove: () => void;
}

export interface TramitFormProps {
    tramitId: string;
    setTramitId: (value: string) => void;
    name: string;
    setName: (value: string) => void;
    selectedType: string;
    setSelectedType: (value: string) => void;
}

export interface ProcedureItemFormularyProps {
    procedure: ProcedureForm;
    index?: number;
    onChange: (updatedProcedure: ProcedureForm) => void;
}

export interface ProcedureItemProps {
    procedure: ProcedureForm;
    index: number;
    onChange: (updatedProcedure: ProcedureForm) => void;
    onRemove: () => void;
}

export interface ProcedureListProps {
    procedures: ProcedureForm[];
    onProcedureChange: (index: number, updatedProcedure: ProcedureForm) => void;
    onRemoveProcedure: (index: number) => void;
    handleOpenModal: () => void;
    handleCloseModal: () => void;
    handleAddNewProcedure: () => void;
    handleUseExistingProcedure: () => void;
    handleSelectProcedure: (event: SelectChangeEvent<number>) => Promise<void>;
    openModal: boolean;
    openSelectModal: boolean;
    loading: boolean;
    selectedProcedure: number | null;
    setOpenSelectModal: (open: boolean) => void;
    tramitadorProcedures: Procedure[];
}
