export interface Document {
    idDocument: number;
    idStepProcedureFolderClient: number | undefined;
    fileName?: string;
    filePath?: string ;
    mimeType?: string;
}
