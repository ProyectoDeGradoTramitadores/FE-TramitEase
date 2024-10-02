export interface ProcedureClient {
    name: string;
    description: string;
    startDate: string;
    endDate: string;
    estimatedDate: string;
    durationDays: number;
    status: 'Completado' | 'En progreso';
}
