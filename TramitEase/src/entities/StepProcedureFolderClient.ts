export interface StepProcedureFolderClient {
    idStepProcedureFolderClient: number;
    idProcedureFolderClient: number;
    idStepProcedure: number;
    isComplete: boolean;
    startDate?: Date | null | string;
    endDate?: Date | null | string;
}
