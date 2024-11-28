export interface StepProcedureFolderClient {
    idStepProcedureFolderClient: number;
    idProcedureFolderClient: number;
    idStepProcedure: number;
    comments?: string;
    isComplete: boolean;
    startDate?: Date | null | string;
    endDate?: Date | null | string;
}
