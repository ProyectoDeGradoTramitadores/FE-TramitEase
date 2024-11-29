import { Client } from '../../entities/Client.ts';

export let emptyClient: Client = {
    idClient: 0,
    ciClient: 'clientId',
    idTramitador: 0,
    name: '',
    secondName: '',
    lastName: '',
    surname: '',
    birth: '',
    email: '',
    cellNumber: '',
    maritalStatus: '',
    nationality: '',
    additionalInfo: {}
};

export let existClient = false

export const setEmptyClient = (client: Client) => {
    emptyClient = {
        ...client,
        name: client.name === '' ? null : client.name,
        secondName: client.secondName === '' ? null : client.secondName,
        lastName: client.lastName === '' ? null : client.lastName,
        surname: client.surname === '' ? null : client.surname,
        birth: client.birth === '' ? null : client.birth,
        email: client.email === '' ? null : client.email,
        cellNumber: client.cellNumber === '' ? null : client.cellNumber,
        maritalStatus: client.maritalStatus === '' ? null : client.maritalStatus,
        nationality: client.nationality === '' ? null : client.nationality,
        additionalInfo: client.additionalInfo && Object.keys(client.additionalInfo).length === 0 ? null : client.additionalInfo
    };
}

export const cleanEmptyClient = () => {
    emptyClient = {
        idClient: 0,
        ciClient: 'clientId',
        idTramitador: 0,
        name: '',
        secondName: '',
        lastName: '',
        surname: '',
        birth: '',
        email: '',
        cellNumber: '',
        maritalStatus: '',
        nationality: '',
        additionalInfo: {}
    };
};


export const setAddtionalInfo = (additionalInfo: Record<string, unknown>) => {
    if (emptyClient != null){
        emptyClient.additionalInfo = additionalInfo;
    }
}

export const IsClientExist = (exist: boolean) => {
    existClient = exist;
}
