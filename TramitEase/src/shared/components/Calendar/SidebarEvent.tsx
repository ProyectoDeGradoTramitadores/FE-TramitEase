import React from 'react';
import { ListItem, ListItemText } from '@mui/material';
import { formatDate } from '@fullcalendar/core';
import { SidebarEventProps } from '../../types/CalendarProps.ts';

const SidebarEvent: React.FC<SidebarEventProps> = ({ event }) => {
    return (
        <ListItem>
            <ListItemText
                primary={event.title}
                secondary={formatDate(event.start!, { year: 'numeric', month: 'short', day: 'numeric' })}
            />
        </ListItem>
    );
};

export default SidebarEvent;
