import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@mui/material';
import { formatDate } from '@fullcalendar/core';
import { EventModalProps } from '../../types/CalendarProps.ts';
import CustomButton from '../buttons/CustomButton.tsx';

const EventModal: React.FC<EventModalProps> = ({ open, event, onClose, redirectTo }) => {
    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth PaperProps={{ style: { borderRadius: 5 } }}>
            <DialogTitle>Event Details</DialogTitle>
            <DialogContent>
                {event && (
                    <div>
                        <Typography variant="h6">{event.title}</Typography>
                        <Typography>
                            <strong>Start:</strong> {formatDate(event.start!, { year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric' })}
                        </Typography>
                        <Typography>
                            <strong>End:</strong> {formatDate(event.end!, { year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric' })}
                        </Typography>
                    </div>
                )}
            </DialogContent>
            <DialogActions>
                <CustomButton size="xs" onClick={onClose} color="primary" $text="Close" $textStyle="normal" />
                <CustomButton size="xs" onClick={redirectTo} color="ternary" $text="Open Client Folder" $textStyle="normal" />
            </DialogActions>
        </Dialog>
    );
};

export default EventModal;
