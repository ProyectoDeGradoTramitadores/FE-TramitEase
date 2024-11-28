import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import FolderIcon from '@mui/icons-material/Folder';
import { useTheme } from 'styled-components';
import { FolderClientViewComponentProps } from '../../types/FolderClientProps.ts';
import { useProcedureFolderClients } from '../../hooks/useProcedureFolderClient.ts';
import { useStepProcedureFolderClients } from '../../hooks/useStepProcedureFolderClients.ts';
import { useStepProcedures } from '../../hooks/useStepProcedures.ts';

const FolderClientViewComponent: React.FC<FolderClientViewComponentProps> = ({ folderName, onClick, idClientFolder }) => {
    const theme = useTheme();
    const { fetchProcedureFolderClientsByClientFolderId } = useProcedureFolderClients();
    const { fetchStepProcedureFolderClientsByProcedureFolderClientId } = useStepProcedureFolderClients();
    const { fetchStepProcedureById } = useStepProcedures();

    const [folderColor, setFolderColor] = useState(theme.colors.primary.default);
    const [folderColorHower, setFolderColorHower] = useState(theme.colors.primary.hower);
    const [folderColorActive, setFolderColorActive] = useState(theme.colors.primary.action);
    const [iconColor, setIconColor] = useState(theme.colors.ternary.default);

    const colorFolder = async () => {
        const procedures = await fetchProcedureFolderClientsByClientFolderId(idClientFolder ?? 0);
        procedures?.sort((a, b) =>
            a.idProcedureFolderClient - b.idProcedureFolderClient);

        if (!procedures?.[0]?.startDate) {
            setFolderColor(theme.colors.secondary.default);
            setFolderColorHower(theme.colors.secondary.hower);
            setFolderColorActive(theme.colors.secondary.action);
            setIconColor(theme.colors.ternary.default);
        } else {
            setFolderColor(theme.colors.secondary.default);
            setIconColor(theme.colors.ternary.default);
            await Promise.all(
                (procedures ?? []).map(async (procedure) => {
                    if (!procedure?.endDate) {
                        const stepProcedures = await fetchStepProcedureFolderClientsByProcedureFolderClientId(procedure.idProcedureFolderClient);
                        await Promise.all(
                            (stepProcedures ?? []).map(async (stepProcedure) => {
                                if (stepProcedure?.startDate && !stepProcedure.endDate) {
                                    const stepPocedure = await fetchStepProcedureById(stepProcedure.idStepProcedure);

                                    const differenceInMilliseconds =
                                        (new Date(stepProcedure.startDate)).getTime() - (new Date()).getTime();

                                    const differenceInDays = Math.abs(Math.floor(differenceInMilliseconds / (24 * 60 * 60 * 1000)));

                                    const daysDifference = stepPocedure?.dayDuring && stepPocedure?.dayDuring > differenceInDays ?
                                        stepPocedure?.dayDuring - differenceInDays : differenceInDays - (stepPocedure?.dayDuring ?? 0);

                                    if (stepPocedure?.dayDuring && differenceInDays > stepPocedure?.dayDuring) {
                                        setFolderColor(theme.colors.error.default);
                                        setFolderColorHower(theme.colors.error.hower);
                                        setFolderColorActive(theme.colors.error.action);
                                        setIconColor(theme.colors.ternary.default);
                                    } else {
                                        if (daysDifference <= Number(localStorage.getItem('daysBeforeDue'))) {
                                            setFolderColor(theme.colors.warning.default);
                                            setFolderColorHower(theme.colors.warning.hower);
                                            setFolderColorActive(theme.colors.warning.action);
                                            setIconColor(theme.colors.ternary.default);
                                        } else {
                                            setFolderColor(theme.colors.success.default);
                                            setFolderColorHower(theme.colors.success.hower);
                                            setFolderColorActive(theme.colors.success.action);
                                            setIconColor(theme.colors.ternary.default);
                                        }
                                    }
                                }
                            })
                        );
                    }
                })
            );
        }
    };

    useEffect(() => {
        colorFolder();
    }, []);

    return (
        <Box
            onClick={onClick}
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-start',
                backgroundColor: folderColor,
                borderRadius: '1cm',
                width: '300px',
                height: '80px',
                padding: '20px',
                transition: 'background-color 0.3s ease',
                '&:hover': {
                    backgroundColor: folderColorHower,
                },
                '&:active': {
                    backgroundColor: folderColorActive,
                },
            }}
        >
            <FolderIcon
                sx={{
                    fontSize: '5rem',
                    color: iconColor,
                    marginRight: '10px',
                }}
            />
            <Typography
                variant="h5"
                sx={{
                    color: theme.colors.shades.white,
                    textAlign: 'left',
                    flex: 1,
                }}
            >
                {folderName}
            </Typography>
        </Box>
    );
};

export default FolderClientViewComponent;
