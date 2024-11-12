import React, { useRef  } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import multiMonthPlugin from '@fullcalendar/multimonth';
import { CalendarProps } from '../../types/CalendarProps.ts';
import { EventContentArg } from '@fullcalendar/core';

const Calendar: React.FC<CalendarProps> = ({
                                               initialEvents,
                                               handleDateSelect,
                                               handleEventClick,
                                               handleEvents
                                           }) => {
    const calendarRef = useRef<FullCalendar>(null);

    function renderEventContent(eventContent: EventContentArg) {
        return (
            <>
                <b>{eventContent.timeText}</b>
                <i>{eventContent.event.title}</i>
            </>
        );
    }

    return (
        <FullCalendar
            ref={calendarRef}
            plugins={[
                dayGridPlugin,
                timeGridPlugin,
                interactionPlugin,
                multiMonthPlugin
            ]}
            headerToolbar={{
                left: 'prev,next today',
                center: 'title',
                right: 'dayGridMonth,timeGridWeek,timeGridDay,multiMonthYear'
            }}
            initialView="multiMonthYear"
            editable={true}
            selectable={true}
            selectMirror={true}
            dayMaxEvents={true}
            contentHeight="auto"
            aspectRatio={1}
            initialEvents={initialEvents}
            select={handleDateSelect}
            eventContent={renderEventContent}
            eventClick={handleEventClick}
            eventsSet={handleEvents}
        />
    );
};

export default Calendar;
