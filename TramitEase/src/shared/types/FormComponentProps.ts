import React from 'react';

export interface FormFieldProps {
    label: string;
    isRequired: boolean;
    value?: string;
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
    name: string;
    description: string;
    steps: { name: string; requirements: string; days: number }[];
}

export interface Step {
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

export interface ProcedureItemProps {
    procedure: ProcedureForm;
    index: number;
    onChange: (updatedProcedure: ProcedureForm) => void;
    onRemove: () => void;
}

export interface ProcedureListProps {
    procedures: ProcedureForm[];
    onAddProcedure: () => void;
    onProcedureChange: (index: number, updatedProcedure: ProcedureForm) => void;
    onRemoveProcedure: (index: number) => void;
}