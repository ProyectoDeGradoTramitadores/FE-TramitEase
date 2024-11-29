import { useState, useEffect } from 'react';
import { EventApi, EventClickArg, EventInput } from '@fullcalendar/core';
import { useClientFoldersByTramitadorId } from './useClientFoldersByTramitadorId.ts';
import { useNavigate } from 'react-router-dom';
import { IDS, ROUTES } from '../constants/routes.ts';
import { useTramits } from './useTramits.ts';
import { useClientFolders } from './useClientFolders.ts';

export function useCalendarEvents(tramitadorId: number) {
    const { filteredClientFolders, loading, error } = useClientFoldersByTramitadorId(tramitadorId);
    const { fetchClientFolderById } = useClientFolders();

    const { fetchTramitById } = useTramits();
    const navigate = useNavigate();
    const id = IDS().TRAMITADOR_ID;

    const [currentEvents, setCurrentEvents] = useState<EventInput[]>([]);
    const [showModal, setShowModal] = useState(false);
    const [completeSelect, setCompleteSelete] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState<EventApi | null>(null);

    const calculateEstimatedDate = (startDate: string | Date, durationDays: number) => {
        if (!startDate || isNaN(new Date(startDate).getTime())) {
            return 'N/A';
        }
        const start = new Date(startDate);
        const estimatedDate = new Date(start);
        estimatedDate.setDate(start.getDate() + durationDays);
        return estimatedDate.toISOString().split('T')[0];
    };

    useEffect(() => {
        const fetchAndUpdateEvents = async () => {
            if (!loading && filteredClientFolders.length > 0 && currentEvents.length <= 0) {
                const updatedEvents : EventInput[] = await Promise.all(
                    filteredClientFolders.map(async folder => {
                        const tramit = await fetchTramitById(folder.idTramit);
                        const estimateDate = folder.creationDate && tramit?.dayDuring ?
                            calculateEstimatedDate(folder.creationDate, tramit.dayDuring) : undefined;
                        return {
                            id: folder.idClientFolder,
                            title: folder.name,
                            start: folder.creationDate,
                            end: folder.endDate? (folder?.creationDate &&
                            new Date(folder?.creationDate).toISOString() === new Date(folder.endDate).toISOString() ?
                                calculateEstimatedDate((folder.endDate), 1) : folder.endDate):  estimateDate,
                            backgroundColor: '#898989'
                        } as EventInput;
                    })
                );
                setCurrentEvents(updatedEvents);
            } else if (loading && currentEvents.length === 0) {
                console.log('Loading events...');
            }
        };

        fetchAndUpdateEvents();
    }, [currentEvents, filteredClientFolders, loading]);

    const handleOpenClientFolder = () => {
        if (selectedEvent) {
            const routeClientFolder = ROUTES.CLIENT_FOLDER(id, selectedEvent.id);
            navigate(routeClientFolder);
        }
    };

    const handleEventClick = async (clickInfo: EventClickArg) => {
        const clientfolder = await fetchClientFolderById(Number(clickInfo.event.id));
        setCompleteSelete(!!clientfolder?.endDate);
        setShowModal(true);
        setSelectedEvent(clickInfo.event);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedEvent(null);
        setCompleteSelete(false);
    };

    const handleEvents = (events: EventApi[]) => {
        setCurrentEvents(events as EventInput[]);
    };

    return {
        currentEvents,
        showModal,
        selectedEvent,
        handleOpenClientFolder,
        loading,
        error,
        completeSelect,
        handleEventClick,
        handleCloseModal,
        handleEvents
    };
}
