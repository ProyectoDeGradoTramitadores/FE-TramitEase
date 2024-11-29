import { EventApi, EventClickArg, EventInput } from '@fullcalendar/core';

export interface SidebarEventProps {
    event: EventApi;
}

export interface EventModalProps {
    open: boolean;
    event: EventApi | null;
    onClose: () => void;
    complete: boolean;
    redirectTo: () => void;
}

export interface CalendarProps {
    initialEvents: EventInput[];
    handleEventClick: (clickInfo: EventClickArg) => void;
    handleEvents: (events: EventApi[]) => void;
}

export interface ComponentSidebarProps {
    currentEvents: EventApi[];
}

export interface ComponentCalendarProps {
    currentEvents: EventApi[];
    showModal: boolean;
    selectedEvent: EventApi | null;
}
