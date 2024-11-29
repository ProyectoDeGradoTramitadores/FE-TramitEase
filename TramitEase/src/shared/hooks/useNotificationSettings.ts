import { useState, useEffect } from 'react';
import { NotificationSettings } from '../types/ModalNotification';

export const useNotificationSettings = (): NotificationSettings & { saveSettings: () => void } => {
    const [daysBeforeDue, setDaysBeforeDue] = useState<number | ''>(3);
    const [whatsAppNotifications, setWhatsAppNotifications] = useState<boolean>(true);
    const [notifyOnExpiry, setNotifyOnExpiry] = useState<boolean>(true);

    useEffect(() => {
        const storedDays = localStorage.getItem('daysBeforeDue');
        const storedWhatsApp = localStorage.getItem('whatsAppNotifications');
        const storedNotifyOnExpiry = localStorage.getItem('notifyOnExpiry');

        if (storedDays) setDaysBeforeDue(Number(storedDays));
        if (storedWhatsApp !== null) setWhatsAppNotifications(storedWhatsApp === 'true');
        if (storedNotifyOnExpiry !== null) setNotifyOnExpiry(storedNotifyOnExpiry === 'true');
    }, []);

    const saveSettings = () => {
        localStorage.setItem('daysBeforeDue', daysBeforeDue.toString());
        localStorage.setItem('whatsAppNotifications', String(whatsAppNotifications));
        localStorage.setItem('notifyOnExpiry', String(notifyOnExpiry));
    };

    return {
        daysBeforeDue,
        whatsAppNotifications,
        notifyOnExpiry,
        setDaysBeforeDue,
        setWhatsAppNotifications,
        setNotifyOnExpiry,
        saveSettings,
    };
};
