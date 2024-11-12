import { useParams } from 'react-router-dom';

export const ROUTES = {
    // Main routes
    ROOT: '/TramitEase',
    TRAMITADOR_ROOT: '/TramitEase/Tramitador',
    CLIENTS_FOLDER: (id: string | number) => `/TramitEase/Tramitador/${id}/ClientsFolder`,
    CLIENT_FOLDER: (id: string | number, idClientFolder: string | number) => `/TramitEase/Tramitador/${id}/ClientsFolder/ClientFolder/${idClientFolder}`,
    CALENDAR: (id: string | number) => `/TramitEase/Tramitador/${id}/Calendar`,

    // Custom Tramits routes
    TRAMITS_CUSTOM: (id: string | number) => `/TramitEase/Tramitador/${id}/Custom/TramitsCustom`,
    TRAMIT_VIEW: (id: string | number, idTramit: string | number) => `/TramitEase/Tramitador/${id}/Custom/TramitsCustom/TramitViewPage/${idTramit}`,
    PROCEDURE_VIEW: (id: string | number, idProcedure: string | number) => `/TramitEase/Tramitador/${id}/Custom/TramitsCustom/ProcedureViewPage/${idProcedure}`,
    TRAMIT_CREATE_NEW: (id: string | number) => `/TramitEase/Tramitador/${id}/Custom/TramitsCustom/TramitCreateNew`,
    EDIT_TRAMIT: (id: string | number, idTramit: string | number) => `/TramitEase/Tramitador/${id}/Custom/TramitsCustom/TramitEditPage/${idTramit}`,
    EDIT_PROCEDURE: (id: string | number, idProcedure: string | number) => `/TramitEase/Tramitador/${id}/Custom/TramitsCustom/ProcedureEditPage/${idProcedure}`,

    // Create Client Folder routes
    CREATE_CLIENT_FOLDER: (id: string | number) => `/TramitEase/Tramitador/${id}/CreateClientFolder/CreateClient`,
    CREATE_FOLDER: (id: string | number, idClient: string | number) => `/TramitEase/Tramitador/${id}/CreateClientFolder/${idClient}/CreateFolder`,

    // Landing page
    LANDING_PAGE: '/TramitEase',
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