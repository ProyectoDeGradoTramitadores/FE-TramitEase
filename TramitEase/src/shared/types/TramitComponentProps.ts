import { Tramit } from '../../entities/Tramit.ts';

export interface TramitComponentProps {
    name: string;
    type: string | Promise<string>;
    onClick?: () => void;
}

export interface TramitListComponentProps {
    tramits: Tramit[];
}

export interface CustomButtonGroupProps {
    idTramit: string;
}