import { useState, useEffect } from 'react';
import { DateSelectArg, EventApi, EventClickArg, EventInput } from '@fullcalendar/core';
import { createEventId } from '../utils/event-utils-calendar.ts';
import { useClientFoldersByTramitadorId } from './useClientFoldersByTramitadorId.ts';

export function useCalendarEvents(tramitadorId: number) {
    const { filteredClientFolders, loading, error } = useClientFoldersByTramitadorId(tramitadorId);

    const [currentEvents, setCurrentEvents] = useState<EventInput[]>([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState<EventApi | null>(null);

    useEffect(() => {
        if (!loading && filteredClientFolders.length > 0 && currentEvents.length <= 0) {
            setCurrentEvents(
                filteredClientFolders.map(folder => ({
                    id: createEventId(),
                    title: folder.name,
                    start: folder.creationDate,
                    end: folder.endDate ?? undefined,
                    backgroundColor: '#898989'
                })) as EventInput[]
            );
        } else if (loading && currentEvents.length == 0) {
            console.log('Loading events...');
        }
    }, [ currentEvents,filteredClientFolders, loading]);


    const handleDateSelect = (selectInfo: DateSelectArg) => {
        const title = prompt('Please enter a new title for your event');
        const calendarApi = selectInfo.view.calendar;
        calendarApi.unselect();

        if (title) {
            calendarApi.addEvent({
                id: createEventId(),
                title,
                start: selectInfo.startStr,
                end: selectInfo.endStr,
                allDay: selectInfo.allDay,
                backgroundColor: '#848184'
            });
        }
    };

    const handleEventClick = (clickInfo: EventClickArg) => {
        setShowModal(true);
        setSelectedEvent(clickInfo.event);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedEvent(null);
    };

    const handleEvents = (events: EventApi[]) => {
        setCurrentEvents(events as EventInput[]);
    };

    return {
        currentEvents,
        showModal,
        selectedEvent,
        loading,
        error,
        handleDateSelect,
        handleEventClick,
        handleCloseModal,
        handleEvents
    };
}
