import { DateSelectArg, EventApi, EventClickArg, EventInput } from '@fullcalendar/core';

export interface SidebarEventProps {
    event: EventApi;
}

export interface EventModalProps {
    open: boolean;
    event: EventApi | null;
    onClose: () => void;
}

export interface CalendarProps {
    initialEvents: EventInput[];
    handleDateSelect: (selectInfo: DateSelectArg) => void;
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
