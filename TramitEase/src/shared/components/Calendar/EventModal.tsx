import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@mui/material';
import { formatDate } from '@fullcalendar/core';
import { EventModalProps } from '../../types/CalendarProps.ts';
import CustomButton from '../buttons/CustomButton.tsx';

const EventModal: React.FC<EventModalProps> = ({ open, event, onClose, redirectTo, complete }) => {
    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth PaperProps={{ style: { borderRadius: 5 } }}>
            <DialogTitle>Carpeta del Cliente</DialogTitle>
            <DialogContent>
                {event && (
                    <div>
                        <Typography variant="h6">{event.title}</Typography>
                        <Typography>
                            <strong>Dia de Inicio: </strong> {formatDate(event.start!, { year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric' })}
                        </Typography>
                        <Typography>
                            <strong>
                                {complete ? 'Día de Finalización: ' : 'Día Estimado de Finalización: '}
                            </strong>
                            {formatDate(event.end!, {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric',
                                hour: 'numeric',
                                minute: 'numeric',
                            })}
                        </Typography>
                        <Typography>
                            <strong>Estado de la carpeta del cliente: </strong>{complete? "Completado" : "En progreso"}
                        </Typography>
                    </div>
                )}
            </DialogContent>
            <DialogActions>
                <CustomButton size="xs" onClick={onClose} color="primary" $text="Cerrar" $textStyle="normal" />
                <CustomButton size="xs" onClick={redirectTo} color="ternary" $text="Ingresar a la Carpeta" $textStyle="normal" />
            </DialogActions>
        </Dialog>
    );
};

export default EventModal;
