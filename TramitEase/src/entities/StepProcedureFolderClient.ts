export interface StepProcedureFolderClient {
    idStepProcedureFolderClient: number;
    idProcedureFolderClient: number;
    idStepProcedure: number;
    commentsDelay?: string;
    isComplete: boolean;
    startDate?: Date | null | string;
    endDate?: Date | null | string;
}
