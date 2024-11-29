import { useState, useEffect } from "react";
import { useClients } from './useClients.ts';
import { useClientFolders } from './useClientFolders.ts';
import { Client } from '../../entities/Client.ts';
import { ClientFolder } from '../../entities/ClientFolder.ts';
import manPerson from "../../shared/assets/image/manPerson.jpeg";
import womanPerson from "../../shared/assets/image/womanPerson.jpeg";
import iconPerson from "../../shared/assets/image/iconPerson.jpeg";

export const useClientInfoView = (idClient: number) => {
    const { fetchClientById } = useClients();
    const { fetchClientFoldersByClientId } = useClientFolders();

    const [client, setClient] = useState<Client>();
    const [clientFolders, setClientFolders] = useState<ClientFolder[]>();
    const [gender, setGender] = useState<string>("");
    const [additionalFields, setAdditionalFields] =
        useState<{ id: number; label: string; value: unknown }[]>([]);

    useEffect(() => {
        if (idClient) {
            fetchClientData();
        }
    }, [idClient]);

    const fetchClientData = async () => {
        try {
            const fetchedClient = await fetchClientById(idClient);
            const data = await fetchClientFoldersByClientId(idClient);

            setClientFolders(data);
            setClient(fetchedClient);

            if (fetchedClient?.additionalInfo) {
                let additionalInfoRaw: Record<string, unknown>;

                if (typeof fetchedClient.additionalInfo === "string") {
                    additionalInfoRaw = JSON.parse(fetchedClient.additionalInfo);
                } else {
                    additionalInfoRaw = fetchedClient.additionalInfo;
                }

                const fields = Object.entries(additionalInfoRaw).map(([key, value]) => ({
                    id: Date.now() + Math.random(),
                    label: key,
                    value: value,
                }));

                const genderField = fields.find((field) =>
                    field.label.toString().toLowerCase() === "genero"
                );

                if (genderField) {
                    const generoValue = genderField.value?.toString().toLowerCase();
                    setGender(generoValue ?? "");
                }

                setAdditionalFields(fields);
            } else {
                console.error("La cadena additionalInfo no es un JSON válido");
            }
        } catch (error) {
            console.error("Error al obtener el cliente:", error);
        }
    };

    const getAvatar = (gender: string) => {
        return gender === "masculino"
            ? manPerson
            : gender === "femenino"
                ? womanPerson
                : iconPerson;
    };

    return {
        client,
        clientFolders,
        additionalFields,
        gender,
        getAvatar,
    };
};
