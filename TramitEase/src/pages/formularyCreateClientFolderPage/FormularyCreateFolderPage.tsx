import React from 'react';
import { Box } from '@mui/material';
import NavigationFolderBreadCrumbs from '../../shared/components/CreateFolder/NavigationFolderBreadCrumbs.tsx';
import CreateFolderFormComponent from '../../shared/components/CreateFolder/CreateFolderFormComponent.tsx';
import CustomButton from '../../shared/components/buttons/CustomButton.tsx';
import { emptyFolder, clearEmptyFolder } from '../../shared/constants/FolderCreate.ts';
import { useClientFolders } from '../../shared/hooks/useClientFolders.ts';
import { useNavigate, useParams } from 'react-router-dom';
import { useTramits } from '../../shared/hooks/useTramits.ts';
import { useProcedureFolderClients } from '../../shared/hooks/useProcedureFolderClient.ts';
import { useStepProcedureFolderClients } from '../../shared/hooks/useStepProcedureFolderClients.ts';
import { useProcedures } from '../../shared/hooks/useProcedures.ts';
import { useTramitProcedures } from '../../shared/hooks/useTramitProcedures.ts';
import { useStepProcedures } from '../../shared/hooks/useStepProcedures.ts';
import { ProcedureFolderClient } from '../../entities/ProcedureFolderClient.ts';
import { StepProcedureFolderClient } from '../../entities/StepProcedureFolderClient.ts';

const FormularyCreateFolderPage: React.FC = () => {
    const {createNewClientFolder} = useClientFolders();
    const {createNewProcedureFolderClient} = useProcedureFolderClients();
    const {createNewStepProcedureFolderClient} = useStepProcedureFolderClients();
    const {fetchTramitProceduresByTramitId} = useTramitProcedures();
    const {fetchProcedureById} = useProcedures();
    const {fetchStepProceduresByProcedureId} = useStepProcedures();
    const {fetchTramitById} = useTramits();
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const handleSaveFolder = async () => {
        if (emptyFolder) {
            const creationDate = new Date(emptyFolder.creationDate);

            try {
                const tramit = await fetchTramitById(emptyFolder.idTramit);
                if (tramit?.dayDuring) {
                    const endDate = new Date(creationDate);
                    endDate.setDate(creationDate.getDate() + tramit.dayDuring);
                    emptyFolder.endDate = endDate.toISOString();
                }

                const newClientFolder = await createNewClientFolder(emptyFolder);
                let isFirstTramit = true;

                const tramits = await fetchTramitProceduresByTramitId(emptyFolder.idTramit);
                if( tramits != undefined ){
                    for (const tramit of tramits) {
                        const procedure = await fetchProcedureById(tramit.idProcedure);
                        const newProcedureFolderClient: ProcedureFolderClient = {
                            idProcedureFolderClient: 0,
                            idClientFolder: Number(newClientFolder?.idClientFolder || ''),
                            idProcedure: Number(procedure?.idProcedure || ''),
                            isComplete: false,
                            startDate: isFirstTramit ? new Date() : null,
                            endDate: null,
                        };

                        const procedureCnt = await createNewProcedureFolderClient(newProcedureFolderClient);
                        const procedureSteps = await fetchStepProceduresByProcedureId(Number(procedure?.idProcedure || ''));

                        if(procedureSteps != null){
                            for (const [index, step] of procedureSteps.entries()) {
                                const newStepProcedureFolderClient: StepProcedureFolderClient = {
                                    idStepProcedureFolderClient: 0,
                                    idProcedureFolderClient: Number(procedureCnt?.idProcedureFolderClient || ''),
                                    idStepProcedure: step.idStepProcedure,
                                    isComplete: false,
                                    startDate: isFirstTramit && index === 0 ? new Date() : null,
                                    endDate: null,
                                };
                                await createNewStepProcedureFolderClient(newStepProcedureFolderClient);
                            }
                        }

                        if (isFirstTramit) {
                            isFirstTramit = false;
                        }
                    }
                }

                clearEmptyFolder();
                navigate(`/TramitEase/Tramitador/${id}/ClientsFolder`);
            } catch (error) {
                console.error("Error creating folder and procedures:", error);
            }
        }
    };


    return (
        <Box
            sx={{
                backgroundColor: 'white',
                padding: '169px 50px',
                width: '1739px',
                height: '590px',
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            <NavigationFolderBreadCrumbs/>
            <CreateFolderFormComponent />
            <Box
                sx={{
                    position: 'absolute',
                    bottom: '50px',
                    right: '50px',
                }}
            >
                <CustomButton
                    $text={"Save Client"}
                    $textStyle={"bold"}
                    size={"s"}
                    color={"ternary"}
                    onClick={handleSaveFolder}
                />
            </Box>
        </Box>
    );
};

export default FormularyCreateFolderPage;

