import { useParams } from 'react-router-dom';
import ComponentSidebar from './ComponentSideBar.tsx';
import Calendar from './Calendar.tsx';
import '../../theme/theme-calendar.css';
import EventModal from './EventModal.tsx';
import { EventApi, EventInput } from '@fullcalendar/core';
import { useCalendarEvents } from '../../hooks/useCalendarEvents.ts';
import { Box, List, Typography } from '@mui/material';
import SidebarEvent from './SidebarEvent.tsx';
import React from 'react';
import ComponentEmptyEvents from './ComponentEmptyEvents.tsx';

export default function ComponentCalendar() {
    const { id } = useParams<{ id: string }>();
    const tramitadorId = Number(id);
    const {
        currentEvents,
        showModal,
        selectedEvent,
        completeSelect,
        loading,
        error,
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
        <div>
            {currentEvents.length > 0 ? (
                <div className="demo-app">
                    <ComponentSidebar currentEvents={currentEvents as EventApi[]} />
                    <Calendar
                        key={tramitadorId}
                        initialEvents={currentEvents.map(event => ({
                            ...event,
                        })) as EventInput[]}
                        handleEventClick={handleEventClick}
                        handleEvents={handleEvents}
                    />
                </div>
            ) : (
                <div className="demo-app">
                    <ComponentEmptyEvents/>
                </div>
            )}
            <EventModal
                complete={completeSelect}
                open={showModal}
                event={selectedEvent}
                onClose={handleCloseModal}
                redirectTo={handleOpenClientFolder}
            />
        </div>
    );
}
