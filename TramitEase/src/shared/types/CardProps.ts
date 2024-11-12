export interface ClientCardProps {
    numberFolder: number;
}

export interface ClientCardViewProps {
    keyClient: string;
    name: string;
    ci: string;
}

export interface CardClientListProps {
    clients: ClientCardViewProps[];
}