import { Procedure } from '../../entities/Procedure.ts';

export interface ProcedureComponentProps {
    name: string;
    daysDuring: string;
    onClick?: () => void;
}

export interface ProcedureListComponentProps {
    procedures: Procedure[];
}

export interface CustomButtonStepsGroupProps {
    idProcedure: string;
}