export interface NotificationModalProps {
    open: boolean;
    onClose: () => void;
}

export interface NotificationSettings {
    daysBeforeDue: number | '';
    whatsAppNotifications: boolean;
    notifyOnExpiry: boolean;
    setDaysBeforeDue: (value: number | '') => void;
    setWhatsAppNotifications: (value: boolean) => void;
    setNotifyOnExpiry: (value: boolean) => void;
}

export interface ConfirmDeleteModalProps {
    isModalOpen: boolean;
    openModal: () => void;
    closeModal: () => void;
    confirmDeletion: () => void;
    textTIle: string;
    textHeader2: string;
}