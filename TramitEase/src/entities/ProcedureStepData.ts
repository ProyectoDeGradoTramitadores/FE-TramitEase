export interface ProcedureStepData {
    idStepProc: string;
    idProcedure: string;
    idStep: string;
    name: string | undefined;
    requirements: string | undefined;
    startDate: string | undefined;
    endDate: string | undefined;
    estimate: string;
    dayDuring: number | undefined;
    isComplete: boolean;
    commentsDelay?: string;
}
