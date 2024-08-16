export interface Client {
    idClient: string;
    name?: string | null;
    secondName?: string | null;
    lastName?: string | null;
    surname?: string | null;
    birth?: string | null;
    email?: string | null;
    cellNumber?: string | null;
    maritalStatus?: string | null;
    nationality?: string | null;
    additionalInfo?: {[key: string]: any } | null;
}
