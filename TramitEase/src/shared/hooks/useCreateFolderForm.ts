import React, { useEffect, useState } from 'react';
import { ClientFolder } from '../../entities/ClientFolder.ts';
import { emptyFolder, setEmptyFolder, setIdClient } from '../constants/FolderCreate.ts';

export const useCreateFolderForm = (initialClientId: string) => {
    const [tramitId, setTramitId] = useState<string | null>(null);
    const [folderData, setFolderData] = useState<ClientFolder | null>(null);

    useEffect(() => {
        if (folderData === null) {
            setFolderData(emptyFolder);
            setIdClient(initialClientId);
        }else {
            setEmptyFolder(folderData);
        }
    }, [folderData,  initialClientId]);

    const handleInputChange = (field: keyof ClientFolder) => (event: React.ChangeEvent<HTMLInputElement>) => {
        setFolderData(folderData? { ...folderData, [field]: event.target.value } : null);
    };

    const handleIdProcedureStatusChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedTramitId = event.target.value;
        setTramitId(selectedTramitId);

        if (selectedTramitId != null) {
            setFolderData(folderData? { ...folderData, idTramit: parseInt(selectedTramitId) } : null);
        }
    };

    return {
        procedureId: tramitId,
        folderData,
        setFolderData,
        handleInputChange,
        handleIdProcedureStatusChange
    };
};
