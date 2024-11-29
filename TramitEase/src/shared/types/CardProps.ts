export interface ClientCardProps {
    numberFolder: number;
}

export interface ClientCardViewProps {
    keyClient: number;
    name: string;
    lastName: string;
    ci: string;
}

export interface CardClientListProps {
    clients: ClientCardViewProps[];
}