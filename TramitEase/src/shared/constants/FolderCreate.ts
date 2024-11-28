import { ClientFolder } from '../../entities/ClientFolder.ts';

export let emptyFolder: ClientFolder = {
    idClientFolder: 0,
    idClient: 0,
    idTramit: 0,
    name: '',
    creationDate: null,
    endDate: '',
};

export const setEmptyFolder = (folder: ClientFolder) => {
    if(folder.idClientFolder == 0){
        emptyFolder = {
            idClient: folder.idClient,
            idTramit: folder.idTramit,
            name: folder.name,
            creationDate: folder.creationDate? folder.creationDate : null,
            endDate: folder.endDate == '' ? null : folder.endDate
        };
    }else {
        emptyFolder = {
            idClientFolder: folder.idClientFolder,
            idClient: folder.idClient,
            idTramit: folder.idTramit,
            name: folder.name,
            creationDate: folder.creationDate,
            endDate: folder.endDate == '' ? null : folder.endDate
        };
    }
}

export const setIdClient = (idClient: number) => {
    emptyFolder.idClient = idClient;
}

export const clearEmptyFolder = () => {
    emptyFolder = {
        idClientFolder: 0,
        idClient: 0,
        idTramit: 0,
        name: '',
        creationDate: new Date().toISOString(),
        endDate: '',
    }
}