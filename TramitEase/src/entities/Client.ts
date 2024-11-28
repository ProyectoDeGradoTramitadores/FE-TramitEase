export interface Client {
    idClient: number;
    ciClient: string;
    idTramitador: number;
    name?: string | null;
    secondName?: string | null;
    lastName?: string | null;
    surname?: string | null;
    birth?: string | null;
    email?: string | null;
    cellNumber?: string | null;
    maritalStatus?: string | null;
    nationality?: string | null;
    additionalInfo?: string | null;
}
