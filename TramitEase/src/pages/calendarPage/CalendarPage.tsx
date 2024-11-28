import React from 'react';
import ComponentCalendar from '../../shared/components/Calendar/ComponentCalendar.tsx';

const CalendarPage: React.FC = () => {
    return (
        <div style={{ backgroundColor: 'white', minHeight: '770px', minWidth:'1832px', padding: '0 20px 0 0' }}>
            <ComponentCalendar />
        </div>
    );
};

export default CalendarPage;
