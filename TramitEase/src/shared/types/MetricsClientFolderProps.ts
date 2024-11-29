export interface MetricsClientFolder {
    dateLastProcedure: Date | null;
    sizeProcedures: number;
    numberPercentComplete: number;
    initialProcedure: Date | null;
    endEstimateDate: Date | null;
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
    endProcedure: Date | null;
    complete: boolean;
    daysEstimate: number;
}

export interface BorderRadiusProps {
    namesSteps: string[];
    valuesStepsDateFinished: number[];
    valuesStepsDateEstimate: number[];
}

export interface PieChartData {
    id: number;
    value: number;
    label: string;
    color?: string;
}

export interface PieChartComponentProps {
    title: string;
    data: PieChartData[];
}

export interface Task {
    id: number;
    name: string;
    start: Date;
    end: Date;
}

export interface GanttChartComponentProps {
    title: string;
    tasks: Task[];
}

export interface ChartMetricsProps {
    nameData: string;
    nameGraph: string;
    labels: string[];
    dataChart: number[];
}

export interface CardTramitDataProps {
    procedureName: string;
    procedureType: string;
    numberOfProcedures: number;
    durationDays: number;
}

export interface ClientFolder {
    clientFolderName?: string;
    durationDays?: number;
    startDate?: string;
    estimatedCompletionDate?: string;
    completionDate?: string;
    isCompleted?: boolean;
    isDelay?: boolean;
    delayOrSurplusDays?: number;
}

export interface TramitReportsProps {
    procedureName: string;
    procedureType: string;
    numberOfProcedures: number;
    durationDays: number;
    rows: ClientFolder[];
    porcentageClientFolder: Record<string, number>,
    porcentageTotal: number,
}

export interface ClientFolderTableProps {
    rows: ClientFolder[];
}

