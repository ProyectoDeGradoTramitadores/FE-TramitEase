export interface MetricsClientFolder {
    dateLastProcedure: Date | null;
    sizeProcedures: number;
    numberPercentComplete: number;
    initialProcedure: Date | null;
    endActuallyProcedure: Date | null;
    completeTramit: boolean;
    delayTramit: boolean;
    daysDelay?: number;
    daysOnTime: number
}

export interface  CustomLineCharProps{
    labels: string[];
    dataSet: DatasetProps[];
}

export interface DatasetProps{
    label: string;
    data: number[];
    borderColor: string;
    backgroundColor: string;
}

export interface CardReportProps {
    nameFolder: string;
    creationDate: string;
    endProcedure: string;
    estimateDate: string;
    completeTramit: boolean;
    delayTramit: boolean;
    daysDelay?: number;
    daysOnTime?: number;
}

export interface stepTableProps {
    idStep: number;
    nameStep: string;
    creationDate: string;
    endDate: string;
    estimateDate: string;
    completeStep: boolean;
    delayStep?: boolean;
    daysDelayOrOnTime: number;
}

export interface TableProcedureProps {
    steps: stepTableProps[];
}

export interface MetricsProcedureProps extends TableProcedureProps{
    nameProcedure: string;
}