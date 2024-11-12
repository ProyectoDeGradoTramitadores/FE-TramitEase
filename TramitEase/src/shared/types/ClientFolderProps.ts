export interface TramitCardProps {
    procedureName: string;
    imageUrl: string;
}

export interface ClientTimelineCardProps {
    startDate: string;
    endDate: string;
}

export interface ClientInfoCardProps {
    procedureName: string;
    duration: number;
}

export interface ClientDataCardProps {
    CI: string;
    name: string;
    birth: string;
    email: string;
    celnumber: string
}

export interface ProcedureDetailsProps {
    procedure: any;
}

export interface StepProgressProps {
    proceduresClient: any[];
    activeStep: number;
    procedureNames: string[];
}

export interface StepProcedureProgressProps {
    activeStepProcedure: number;
    stepProcedures: any[][];
    handleNextProcedure: () => void;
    handleBackProcedure: () => void;
}