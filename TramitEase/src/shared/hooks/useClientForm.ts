import React, { useState, useEffect } from 'react';
import { useClients } from './useClients.ts';
import { emptyClient, IsClientExist, setAddtionalInfo, setEmptyClient } from '../constants/ClientCreate.ts';
import { Client } from '../../entities/Client.ts';
import { useParams } from 'react-router-dom';

export const useClientForm = () => {
    const [clientId, setClientId] = useState<string>('');
    const [clientData, setClientData] = useState<Client | null>(null);
    const [additionalFields, setAdditionalFields] = useState<{ id: number; label: string; value: string }[]>([]);
    const { checkClientExistsAndFetch } = useClients();
    const idTramitador = useParams<{ id: string }>();

    useEffect(() => {
        if (clientData?.additionalInfo) {
            try {
                const additionalInfoObj = JSON.parse(clientData.additionalInfo.toString());
                const fields = Object.entries(additionalInfoObj).map(([key, value]) => ({
                    id: Date.now() + Math.random(),
                    label: `name value: value`,
                    value: `${key}: ${value}`
                }));
                setAdditionalFields(fields);
            } catch (error) {
                console.error("Error parsing additionalInfo:", error);
            }
        } else {
            setAdditionalFields([]);
        }

        if (clientData != null) {
            setEmptyClient(clientData);
        }
    }, [clientData]);

    const handleClientIdChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const id = event.target.value;
        setClientId(id);

        if (id) {
            const client = await checkClientExistsAndFetch(id);
            if (client && client?.idTramitador == Number(idTramitador.id)) {
                setClientData(client);
                IsClientExist(true);
                console.log(`Client with ID ${id} exists.`);
            } else {
                emptyClient.idClient = id;
                emptyClient.idTramitador = Number(idTramitador);
                IsClientExist(false);
                setClientData(emptyClient);
                console.log(`Client with ID ${id} does not exist.`);
                setAdditionalFields([]);
            }
        } else {
            setClientData(null);
            IsClientExist(false);
            setAdditionalFields([]);
        }
    };

    const updateEmptyClientAdditionalInfo = (fields: { id: number; label: string; value: string }[]) => {
        const additionalInfo: Record<string, any> = {};
        fields.forEach(field => {
            const [key, value] = field.value.split(": ");
            additionalInfo[key] = value;
        });
        setAddtionalInfo(additionalInfo);
    };

    const handleAddField = () => {
        const newField = { id: Date.now(), label: 'Nombre Valor: valor', value: '' };
        const updatedFields = [...additionalFields, newField];
        setAdditionalFields(updatedFields);
        updateEmptyClientAdditionalInfo(updatedFields);
    };

    const handleRemoveField = (id: number) => {
        const updatedFields = additionalFields.filter((field) => field.id !== id);
        setAdditionalFields(updatedFields);
        updateEmptyClientAdditionalInfo(updatedFields);
    };

    const handleFieldChange = (id: number, newValue: string) => {
        const updatedFields = additionalFields.map((field) =>
            field.id === id ? { ...field, value: newValue } : field
        );
        setAdditionalFields(updatedFields);
        updateEmptyClientAdditionalInfo(updatedFields);
    };

    const handleDateChange = (date: string) => {
        setClientData(clientData ? { ...clientData, birth: date } : null);
    };

    const handleInputChange = (field: keyof Client) => (event: React.ChangeEvent<HTMLInputElement>) => {
        setClientData(clientData ? { ...clientData, [field]: event.target.value } : null);
    };

    const handleMaritalStatusChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setClientData(clientData ? { ...clientData, maritalStatus: event.target.value } : null);
    };

    return {
        clientId,
        clientData,
        additionalFields,
        handleClientIdChange,
        handleAddField,
        handleRemoveField,
        handleFieldChange,
        handleDateChange,
        handleInputChange,
        handleMaritalStatusChange
    };
};
