export interface ActionMenuProps {
    anchorEl: null | HTMLElement;
    onClose: () => void;
    onDelete: () => void;
    idTramit: string | number;
    navigate: (path: string) => void;
}

export interface ConfirmationModalProps {
    open: boolean;
    onClose: () => void;
    onConfirm: () => void;
}

export interface WarningModalProps {
    open: boolean;
    onClose: () => void;
}

export interface CustomButtonGroupProps {
    idTramit: string | number;
}

export interface CustomFabButtonProps {
    onClick: (event: React.MouseEvent<HTMLElement>) => void;
}