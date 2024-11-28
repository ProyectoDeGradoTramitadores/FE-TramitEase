import { useState } from 'react';
import { useClientFolders } from './useClientFolders.ts';
import { useNavigate } from 'react-router-dom';
import { IDS, ROUTES } from '../constants/routes.ts';
import { useProcedureFolderClients } from './useProcedureFolderClient.ts';
import { useStepProcedureFolderClients } from './useStepProcedureFolderClients.ts';
import { useDocuments } from './useDocuments.ts';
import { deleteFile } from '../services/firebase/uploadService.ts';

export const useCustomButtonGroupClientFolder = (idClientFolder: string | number) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [openConfirmationModal, setOpenConfirmationModal] = useState(false);
    const navigate = useNavigate();
    const id = IDS().TRAMITADOR_ID

    const { deleteExistingClientFolder,fetchClientFolderById  } = useClientFolders();
    const { deleteExistingDocument,fetchDocumentsByStepProcedureId } = useDocuments();
    const { deleteExistingProcedureFolderClient, fetchProcedureFolderClientsByClientFolderId } = useProcedureFolderClients();
    const { deleteExistingStepProcedureFolderClient, fetchStepProcedureFolderClientsByProcedureFolderClientId  } = useStepProcedureFolderClients();

    const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleDelete = async () => {
        try {
            const clientFolder = await fetchClientFolderById(Number(idClientFolder));
            if (clientFolder) {
                console.log("Opening confirmation modal");
                setOpenConfirmationModal(true);
            }
        } catch (error) {
            console.error('Error fetching client folders:', error);
        } finally {
            handleMenuClose();
        }
    };

    const confirmDelete = async () => {
        try {
            const ProceduresClientFolder = await fetchProcedureFolderClientsByClientFolderId(
                Number(idClientFolder)
            );

            if (ProceduresClientFolder && ProceduresClientFolder.length > 0) {
                const deletePromises = ProceduresClientFolder.map(async (procedure) => {
                    const stepsProceduresClientFolder = await fetchStepProcedureFolderClientsByProcedureFolderClientId(
                        Number(procedure.idProcedureFolderClient)
                    );

                    await Promise.all(
                        stepsProceduresClientFolder?.map(async (stepProcedure) => {
                            const documents = await fetchDocumentsByStepProcedureId(stepProcedure.idStepProcedureFolderClient);
                            await Promise.all(
                                (documents ?? []).map(async (document) => {
                                    await deleteFile(document?.filePath ?? "");
                                    await deleteExistingDocument(document.idDocument);
                                })
                            );

                            await deleteExistingStepProcedureFolderClient(stepProcedure.idStepProcedureFolderClient);
                        }) ?? []
                    );

                    await deleteExistingProcedureFolderClient(procedure?.idProcedureFolderClient);
                });
                await Promise.all(deletePromises);
            }
            await deleteExistingClientFolder(Number(idClientFolder));
            navigate(ROUTES.CLIENTS_FOLDER(parseInt(id)));
        } catch (error) {
            console.error('Error deleting tramit:', error);
        } finally {
            setOpenConfirmationModal(false);
        }
    };

    return {
        anchorEl,
        openConfirmationModal,
        handleMenuOpen,
        handleMenuClose,
        handleDelete,
        confirmDelete,
        setOpenConfirmationModal,
    };
};
