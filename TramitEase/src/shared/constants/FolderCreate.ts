import { ClientFolder } from '../../entities/ClientFolder.ts';

export let emptyFolder: ClientFolder = {
    idClientFolder: 0,
    idClient: '',
    idTramit: 0,
    name: '',
    creationDate: null,
    endDate: '',
};

export const setEmptyFolder = (folder: ClientFolder) => {
    if(folder.idClientFolder == 0){
        const processedFolder: ClientFolder = {
            idClient: folder.idClient,
            idTramit: folder.idTramit,
            name: folder.name,
            creationDate: folder.creationDate,
            endDate: folder.endDate == '' ? null : folder.endDate
        };

        emptyFolder = processedFolder;
    }else {
        const processedFolder: ClientFolder = {
            idClientFolder: folder.idClientFolder,
            idClient: folder.idClient,
            idTramit: folder.idTramit,
            name: folder.name,
            creationDate: folder.creationDate,
            endDate: folder.endDate == '' ? null : folder.endDate
        };
        emptyFolder = processedFolder;
    }
}

export const setIdClient = (idClient: string) => {
    emptyFolder.idClient = idClient;
}

export const clearEmptyFolder = () => {
    emptyFolder = {
        idClientFolder: 0,
        idClient: '',
        idTramit: 0,
        name: '',
        creationDate: new Date().toISOString(),
        endDate: '',
    }
}