export interface ProgressClientProps {
    idFolderClient: string;
}

export interface DataProcedureProps {
    name: string;
    description: string;
    initialDay: string;
    estimateDay: string;
    durationDays: string;
    Status: string;
}

export interface ProcedureStepDataProps {
    name: string;
    requeriments?: string;
    startDate?: string;
    endDate?: string;
    estimate: string;
    dayDuRING?: number;
}