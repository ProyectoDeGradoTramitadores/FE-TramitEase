import { useEffect, useState } from 'react';
import { Client } from '../../entities/Client.ts';
import { useClients } from './useClients.ts';
import { useNavigate } from 'react-router-dom';

export const useClientsPage = (idTramitador: number) => {
    const { fetchClientsByTramitadorId } = useClients();
    const navigate = useNavigate();

    const [clients, setClients] = useState<Client[]>([]);
    const [filteredClients, setFilteredClients] = useState<Client[]>([]);

    const fetchClients = async () => {
        try {
            const clientsT = await fetchClientsByTramitadorId(Number(idTramitador));
            setClients(clientsT ?? []);
            setFilteredClients(clientsT ?? []);
        } catch (error) {
            console.error("Error fetching clients:", error);
        }
    };

    useEffect(() => {
        fetchClients();
    }, [idTramitador]);

    const handleSearch = (query: string) => {
        const filtered = clients.filter(client =>
            client.name?.toLowerCase().includes(query.toLowerCase()) ??
            client.ciClient?.toString().includes(query)
        );
        setFilteredClients(filtered);
    };

    const handleCreateClient = () => {
        navigate(`CreateClient`);
    };

    return { clients, fetchClientsByTramitadorId, handleCreateClient, handleSearch,  filteredClients };
};
