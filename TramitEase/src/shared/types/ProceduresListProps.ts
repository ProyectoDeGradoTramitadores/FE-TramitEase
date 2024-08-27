import { Procedure } from '../../entities/Procedure.ts';
import { StepProcedure } from '../../entities/StepProcedure.ts';

export interface ProceduresListProps {
    procedures: Procedure[];
    proceduresWithSteps: Map<number, StepProcedure[]>;
}

export interface ProcedureStepListProps {
    procedureWithSteps: StepProcedure[];
}
