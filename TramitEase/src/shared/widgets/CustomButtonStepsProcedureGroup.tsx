import React, { useState } from 'react';
import { Box, IconButton, Menu, MenuItem, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { CustomButtonStepsGroupProps } from '../types/ProcedureComponentProps.ts';
import { useTramitProcedures } from '../hooks/useTramitProcedures.ts';
import AddIcon from '@mui/icons-material/Add';
import { Modal } from '@mui/joy';
import { useTheme } from 'styled-components';
import { useProcedures } from '../hooks/useProcedures.ts';
import { useStepProcedures } from '../hooks/useStepProcedures.ts';
import { IDS, ROUTES } from '../constants/routes.ts';
import CustomButton from '../components/buttons/CustomButton.tsx';

const CustomButtonWithMenu: React.FC<CustomButtonStepsGroupProps> = ({ idProcedure }) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [openModal, setOpenModal] = useState<boolean>(false);
    const [errorModal, setErrorModal] = useState<boolean>(false);
    const { fetchTramitProceduresByProcedureId } = useTramitProcedures();
    const { deleteExistingProcedure } = useProcedures();
    const { deleteExistingStepProcedure, fetchStepProceduresByProcedureId } = useStepProcedures();
    const navigate = useNavigate();
    const id = IDS().TRAMITADOR_ID;
    const route = ROUTES.TRAMITS_CUSTOM(id);
    const theme = useTheme();

    const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleDelete = async () => {
        const tramitProcedures = await fetchTramitProceduresByProcedureId(parseInt(idProcedure));
        if (tramitProcedures && tramitProcedures.length > 0) {
            setErrorModal(true);
        } else {
            setOpenModal(true);
        }
        handleMenuClose();
    };

    const handleConfirmDelete = async () => {
        const deleteStepsProcedures = await fetchStepProceduresByProcedureId(parseInt(idProcedure));

        if (deleteStepsProcedures && deleteStepsProcedures.length > 0) {
            await Promise.all(
                deleteStepsProcedures.map(async (stepProcedure) => {
                    await deleteExistingStepProcedure(stepProcedure.idStepProcedure);
                })
            );
        }

        await deleteExistingProcedure(parseInt(idProcedure));
        setOpenModal(false);
        navigate(route);
    };

    return (
        <div>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                <IconButton
                    onClick={handleMenuOpen}
                    sx={{ backgroundColor: theme.colors.ternary.default,
                        color: theme.colors.background.default,
                        '&:hover': {
                            backgroundColor: theme.colors.ternary.hower,
                        },
                        '&:active': {
                            backgroundColor: theme.colors.ternary.action,
                        }}}
                >
                    <AddIcon />
                </IconButton>
            </Box>
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
            >
                <MenuItem onClick={() => navigate(`/TramitEase/Tramitador/${id}/Custom/TramitsCustom/ProcedureEditPage/${idProcedure}`)}>Edit</MenuItem>
                <MenuItem onClick={handleDelete}>Delete</MenuItem>
                <MenuItem onClick={() => navigate(`/TramitEase/Tramitador/${id}/Custom/TramitsCustom`)}>Exit</MenuItem>
            </Menu>

            <Modal
                open={openModal}
                onClose={() => setOpenModal(false)}
                aria-labelledby="confirm-delete-title"
                aria-describedby="confirm-delete-description"
            >
                <Box sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 400,
                    bgcolor: 'background.paper',
                    p: 4,
                    boxShadow: 24,
                    borderRadius: 2
                }}>
                    <Typography id="confirm-delete-title" variant="h6" component="h2" color={"black"}>
                        Are you sure you want to delete this procedure?
                    </Typography>
                    <Box mt={2} display="flex" justifyContent="flex-end" gap={2}>
                        <CustomButton
                            color={"primary"}
                            $textStyle={"bold"}
                            size={"s"}
                            $text={"Continue"}
                            onClick={handleConfirmDelete}
                        />
                        <CustomButton
                            color={"ternary"}
                            $textStyle={"bold"}
                            size={"s"}
                            $text={"Cancel"}
                            onClick={() => setOpenModal(false)}
                        />
                    </Box>
                </Box>
            </Modal>

            <Modal
                open={errorModal}
                onClose={() => setErrorModal(false)}
                aria-labelledby="error-delete-title"
                aria-describedby="error-delete-description"
            >
                <Box sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 400,
                    bgcolor: 'background.paper',
                    p: 4,
                    boxShadow: 24,
                    borderRadius: 2
                }}>
                    <Typography id="error-delete-title" variant="h6" component="h2" color="black">
                        Oops, you cannot delete this procedure!
                    </Typography>
                    <Typography id="error-delete-description" mt={2} color="black">
                        This procedure is being used by one or more tramits.
                    </Typography>
                    <Box mt={2} display="flex" justifyContent="flex-end">
                        <CustomButton
                            color={"ternary"}
                            $textStyle={"bold"}
                            size={"s"}
                            $text={"Cancel"}
                            onClick={() => setErrorModal(false)}
                        />
                    </Box>
                </Box>
            </Modal>
        </div>
    );
};

export default CustomButtonWithMenu;