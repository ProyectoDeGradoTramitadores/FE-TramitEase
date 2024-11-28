import { Client } from '../../entities/Client.ts';
import { ClientFolder } from '../../entities/ClientFolder.ts';


export interface ClientCardProps {
    client: Client | null;
    gender: string;
    getAvatar: (gender: string) => string;
}

export interface AdditionalField {
    id: number;
    label: string;
    value: unknown;
}

export interface AdditionalClientInfoCardProps {
    additionalFields: AdditionalField[];
}

export interface ClientFoldersTableProps {
    clientFolders: ClientFolder[];
    idTramitador: number;
}