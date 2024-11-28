import { useParams } from 'react-router-dom';

export const ROUTES = {
    ROOT: '/',
    TRAMITADOR_ROOT: '/Tramitador',
    CLIENTS_FOLDER: (id: string | number) => `/Tramitador/${id}/ClientsFolder`,
    CLIENT_FOLDER: (id: string | number, idClientFolder: string | number) => `/Tramitador/${id}/ClientsFolder/ClientFolder/${idClientFolder}`,
    CALENDAR: (id: string | number) => `/Tramitador/${id}/Calendar`,

    TRAMITS_CUSTOM: (id: string | number) => `/Tramitador/${id}/Custom/TramitsCustom`,
    TRAMIT_VIEW: (id: string | number, idTramit: string | number) => `/Tramitador/${id}/Custom/TramitsCustom/TramitViewPage/${idTramit}`,
    PROCEDURE_VIEW: (id: string | number, idProcedure: string | number) => `/Tramitador/${id}/Custom/TramitsCustom/ProcedureViewPage/${idProcedure}`,
    TRAMIT_CREATE_NEW: (id: string | number) => `/Tramitador/${id}/Custom/TramitsCustom/TramitCreateNew`,
    EDIT_TRAMIT: (id: string | number, idTramit: string | number) => `/Tramitador/${id}/Custom/TramitsCustom/TramitEditPage/${idTramit}`,
    EDIT_PROCEDURE: (id: string | number, idProcedure: string | number) => `/Tramitador/${id}/Custom/TramitsCustom/ProcedureEditPage/${idProcedure}`,

    CREATE_CLIENT_FOLDER: (id: string | number) => `/Tramitador/${id}/CreateClientFolder/CreateClient`,
    CREATE_FOLDER: (id: string | number, idClient: string | number) => `/Tramitador/${id}/CreateClientFolder/${idClient}/CreateFolder`,

    LANDING_PAGE: '/',
};

export const IDS = () => {
    const { idTramit } = useParams<{ idTramit: string }>();
    const { id } = useParams<{ id: string }>();
    const { idClientFolder } = useParams<{ idClientFolder: string }>();
    const { idClient } = useParams<{ idClient: string }>();
    const { idProcedure } = useParams<{ idProcedure: string }>();

    return {
        TRAMITADOR_ID: id ?? '',
        CLIENT_ID: idClient ?? '',
        TRAMIT_ID: idTramit ?? '',
        PROCEDURE_ID: idProcedure ?? '',
        CLIENT_FOLDER_ID: idClientFolder ?? '',
    };
};