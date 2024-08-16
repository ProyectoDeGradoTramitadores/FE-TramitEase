export interface ClientFolder {
    idClientFolder?: number;
    idClient: string;
    idTramit: number;
    name: string;
    creationDate: string;
    endDate?: string | null;
}
