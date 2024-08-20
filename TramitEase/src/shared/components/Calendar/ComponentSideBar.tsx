import React from 'react';
import { Typography, List } from '@mui/material';
import { ComponentSidebarProps } from '../../types/CalendarProps.ts';
import SidebarEvent from './SidebarEvent.tsx';

const ComponentSidebar: React.FC<ComponentSidebarProps> = ({ currentEvents }) => {
    return (
        <div className="demo-app-sidebar">
            <div className="demo-app-sidebar-section">
                <Typography variant="h6">All Events ({currentEvents.length})</Typography>
                <List>
                    {currentEvents.map(event => (
                        <SidebarEvent key={event.id} event={event} />
                    ))}
                </List>
            </div>
        </div>
    );
};

export default ComponentSidebar;