import { useParams } from 'react-router-dom';
import ComponentSidebar from './ComponentSideBar.tsx';
import Calendar from './Calendar.tsx';
import '../../theme/theme-calendar.css';
import EventModal from './EventModal.tsx';
import { EventApi, EventInput } from '@fullcalendar/core';
import { useCalendarEvents } from '../../hooks/useCalendarEvents.ts';

export default function ComponentCalendar() {
    const { id } = useParams<{ id: string }>();
    const tramitadorId = Number(id);
    const {
        currentEvents,
        showModal,
        selectedEvent,
        loading,
        error,
        handleDateSelect,
        handleEventClick,
        handleCloseModal,
        handleOpenClientFolder,
        handleEvents
    } = useCalendarEvents(tramitadorId);

    if (loading) {
        return <div style={{backgroundColor: '#ffff'}}>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="demo-app">
            <ComponentSidebar currentEvents={currentEvents as EventApi[]} />
            {currentEvents.length > 0 && (
                <Calendar
                    key={tramitadorId}
                    initialEvents={currentEvents as EventInput[]}
                    handleDateSelect={handleDateSelect}
                    handleEventClick={handleEventClick}
                    handleEvents={handleEvents}
                />
            )}
            <EventModal
                open={showModal}
                event={selectedEvent}
                onClose={handleCloseModal}
                redirectTo={handleOpenClientFolder}
            />
        </div>
    );
}
