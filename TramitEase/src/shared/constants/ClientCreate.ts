import { Client } from '../../entities/Client.ts';

export var emptyClient: Client = {
    idClient: 'clientId',
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

export var existClient: Boolean = false

export const setEmptyClient = (client: Client) => {
    const processedClient: Client = {
        ...client,
        name: client.name === ''? null : client.name,
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

    emptyClient = processedClient;
}
export const setAddtionalInfo = (additionalInfo: { [p: string]: any }) => {
    if (emptyClient != null){
        emptyClient.additionalInfo = additionalInfo;
    }
}

export const IsClientExist = (exist: boolean) => {
    existClient = exist;
}
