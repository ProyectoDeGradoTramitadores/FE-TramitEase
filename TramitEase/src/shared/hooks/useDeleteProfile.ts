import { useProcedures } from './useProcedures.ts';
import { useStepProcedures } from './useStepProcedures.ts';
import { useTypeTramits } from './useTypeTramits.ts';
import { useClients } from './useClients.ts';
import { useClientFolders } from './useClientFolders.ts';
import { useDocuments } from './useDocuments.ts';
import { useProcedureFolderClients } from './useProcedureFolderClient.ts';
import { useStepProcedureFolderClients } from './useStepProcedureFolderClients.ts';
import { useTramits } from './useTramits.ts';
import { useTramitProcedures } from './useTramitProcedures.ts';
import { useTramitadores } from './useTramitadores.ts';
import { ClientFolder } from '../../entities/ClientFolder.ts';
import { StepProcedureFolderClient } from '../../entities/StepProcedureFolderClient.ts';
import { Tramit } from '../../entities/Tramit.ts';
import { Document } from '../../entities/Document.ts';
import { Procedure } from '../../entities/Procedure.ts';
import { TypeTramit } from '../../entities/TypeTramit.ts';
import { Client } from '../../entities/Client.ts';
import { deleteUserAccount } from '../services/firebase/authService.ts';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../constants/routes.ts';
import { TramitProcedure } from '../../entities/TramitProcedure.ts';
import { deleteFile } from '../services/firebase/uploadService.ts';
import { useState } from 'react';

const useDeleteProfile = (idTramitador: number) => {
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const { fetchClientsByTramitadorId, deleteExistingClient } = useClients();
    const { fetchClientFoldersByTramitId, deleteExistingClientFolder } = useClientFolders();
    const { fetchDocumentsByStepProcedureId, deleteExistingDocument } = useDocuments();
    const { fetchProcedureFolderClientsByClientFolderId,
        deleteExistingProcedureFolderClient } = useProcedureFolderClients();
    const { fetchStepProcedureFolderClientsByProcedureFolderClientId,
        deleteExistingStepProcedureFolderClient } = useStepProcedureFolderClients();
    const { fetchTramitsByTramitadorId, deleteExistingTramit } = useTramits();
    const { fetchTramitProceduresByTramitId, deleteExistTramitProcedure } = useTramitProcedures();
    const { deleteExistingTramitador } = useTramitadores();
    const { fetchStepProceduresByProcedureId, deleteExistingStepProcedure } = useStepProcedures();
    const { fetchProceduresByTramitadorId, deleteExistingProcedure } = useProcedures();
    const { fetchTypeTramitsByTramitadorId, deleteExistingTypeTramit } = useTypeTramits();

    const deleteDocumentsStep =
        async (documentsStep: Document[]) => {

        for (const doc of documentsStep) {
            await deleteFile(doc.filePath ?? "");
            await deleteExistingDocument(doc.idDocument);
        }
    }

    const deleteStepProceduresFolderClient =
        async (stepProcedureFolderClients: StepProcedureFolderClient[]) => {
        await Promise.all(
            stepProcedureFolderClients.map(async (stepClientFolder) => {
                const documentsStep = await fetchDocumentsByStepProcedureId(stepClientFolder.idStepProcedureFolderClient);
                await deleteDocumentsStep(documentsStep ?? []);
                await deleteExistingStepProcedureFolderClient(stepClientFolder.idStepProcedureFolderClient);
            })
        );
    };

    const deleteClientFolder = async (clientFolder: ClientFolder) => {
        const procedures =
            await fetchProcedureFolderClientsByClientFolderId(clientFolder.idClientFolder ?? 0);

        for (const procedure of procedures ?? []) {
            const stepsProcedures =
                await fetchStepProcedureFolderClientsByProcedureFolderClientId(procedure.idProcedureFolderClient);

            await deleteStepProceduresFolderClient(stepsProcedures ?? []);

            await deleteExistingProcedureFolderClient(procedure.idProcedureFolderClient);
        }

        await deleteExistingClientFolder(clientFolder.idClientFolder ?? 0);
    };

    const deleteClientsFolder = async (clientsFolders: ClientFolder[]) => {
        for (const clientsFolder of clientsFolders) {
            await deleteClientFolder(clientsFolder);
        }
    }

    const deleteTramitsProcedure = async (tramitProcedures: TramitProcedure[]) => {
        await Promise.all(
            tramitProcedures.map(async (procedure) => {
                await deleteExistTramitProcedure(procedure.idTramitProcedure);
            })
        );
    }

    const deleteTramits = async (tramits: Tramit[]) => {
        for (const tramit of tramits) {
            const tramitProcedures =
                await fetchTramitProceduresByTramitId(tramit.idTramit);
            await deleteTramitsProcedure(tramitProcedures ?? []);

            const clientsFolders = await fetchClientFoldersByTramitId(tramit.idTramit);
            await deleteClientsFolder(clientsFolders);

            await deleteExistingTramit(tramit.idTramit);
        }
    }

    const deleteProcedures = async (procedures: Procedure[]) => {
        for (const procedure of procedures) {
            const steps = await fetchStepProceduresByProcedureId(procedure.idProcedure);
            if (steps) {
                for (const step of steps) {
                    await deleteExistingStepProcedure(step.idStepProcedure);
                }
            }
            await deleteExistingProcedure(procedure.idProcedure);
        }
    }

    const deleteTypesTramit = async (typesTramit : TypeTramit[]) => {
        for (const type of typesTramit) {
            await deleteExistingTypeTramit(type.idTypeTramit);
        }
    }

    const deleteCLients = async (clientsTramitador : Client[]) => {
        for (const client of clientsTramitador) {
            await deleteExistingClient(client.idClient);
        }
    }


    const handleDeleteProfile = async () => {
        const tramits = await fetchTramitsByTramitadorId(idTramitador);
        await deleteTramits(tramits)

        const procedures = await fetchProceduresByTramitadorId(idTramitador);
        await deleteProcedures(procedures ?? []);

        const typesTramit = await fetchTypeTramitsByTramitadorId(idTramitador);
        await deleteTypesTramit(typesTramit);

        const clientsTramitador = await fetchClientsByTramitadorId(idTramitador);
        await deleteCLients(clientsTramitador ?? []);

        await deleteExistingTramitador(idTramitador);
        await deleteUserAccount();

        navigate(ROUTES.LANDING_PAGE);
    };

    const confirmDeletion = async () => {
        await handleDeleteProfile();
        closeModal();
    };

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    return {
        handleDeleteProfile,
        confirmDeletion,
        isModalOpen,
        openModal,
        closeModal
    };
};

export default useDeleteProfile;
