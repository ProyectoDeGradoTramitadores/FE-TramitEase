import { useEffect, useState } from 'react';
import { useTramitadores } from './useTramitadores.ts';
import { Tramitador } from '../../entities/Tramitador.ts';

const useAccountTramitador = (idTramitador: number) => {
    const [isEditing, setIsEditing] = useState(false);
    const [tramitador, setTramitador] = useState<Tramitador | null>(null);
    const [editedName, setEditedName] = useState("");
    const [editedLastName, setEditedLastName] = useState("");

    const { updateExistingTramitador, fetchTramitadorById } = useTramitadores();

    const getTramitador = async () => {
        try {
            const fetchedTramitador = await fetchTramitadorById(Number(idTramitador));
            setTramitador(fetchedTramitador ?? null);
            setEditedName(fetchedTramitador?.name ?? "")
            setEditedLastName(fetchedTramitador?.lastName ?? "")
        } catch (error) {
            console.error('Error fetching tramitador:', error);
        }
    };

    useEffect(() => {
        getTramitador();
    }, [idTramitador]);

    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEditedName(event.target.value);
    };

    const handleLastNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEditedLastName(event.target.value);
    };

    const handleSaveChanges = async () => {
        if(tramitador){
            await updateExistingTramitador(tramitador.idTramitador, {
                ...tramitador,
                name: editedName,
                lastName: editedLastName
            });
        }
        getTramitador();
        setIsEditing(false);
    };

    const handleCancelEditing = () => {
        if(tramitador){
            setEditedName(tramitador?.name ?? "");
            setEditedLastName(tramitador?.lastName ?? "");
        }
        setIsEditing(false);
    };

    return {
        isEditing,
        editedName,
        tramitador,
        editedLastName,
        handleNameChange,
        handleLastNameChange,
        handleSaveChanges,
        handleCancelEditing,
        setIsEditing,
        getTramitador,
    };
};

export default useAccountTramitador;
