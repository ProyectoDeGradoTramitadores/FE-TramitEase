export interface ProcedureFolderClient {
    idProcedureFolderClient: number;
    idClientFolder: number;
    idProcedure: number;
    isComplete: boolean;
    startDate?: Date | null;
    endDate?: Date | null;
}
