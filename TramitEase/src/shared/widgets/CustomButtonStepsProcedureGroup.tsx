import React, { useState } from 'react';
import { Box, Button, IconButton, Menu, MenuItem, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { CustomButtonStepsGroupProps } from '../types/ProcedureComponentProps.ts';
import { useTramitProcedures } from '../hooks/useTramitProcedures.ts';
import AddIcon from '@mui/icons-material/Add';
import { Modal } from '@mui/joy';
import { useTheme } from 'styled-components';

const CustomButtonWithMenu: React.FC<CustomButtonStepsGroupProps> = ({ idProcedure }) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [openModal, setOpenModal] = useState<boolean>(false);
    const [errorModal, setErrorModal] = useState<boolean>(false);
    const { fetchTramitProceduresByProcedureId, deleteExistTramitProcedure } = useTramitProcedures();
    const navigate = useNavigate();
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
        await deleteExistTramitProcedure(parseInt(idProcedure));
        setOpenModal(false);
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
                <MenuItem onClick={() => navigate(`/TramitEase/Tramitador/1/Custom/TramitsCustom/ProcedureEditPage/${idProcedure}`)}>Edit</MenuItem>
                <MenuItem onClick={handleDelete}>Delete</MenuItem>
                <MenuItem onClick={() => navigate('/TramitEase/Tramitador/1/Custom/TramitsCustom')}>Exit</MenuItem>
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
                    <Typography id="confirm-delete-title" variant="h6" component="h2">
                        Are you sure you want to delete this procedure?
                    </Typography>
                    <Box mt={2} display="flex" justifyContent="flex-end" gap={2}>
                        <Button variant="contained" color="secondary" onClick={() => setOpenModal(false)}>
                            Cancel
                        </Button>
                        <Button variant="contained" color="primary" onClick={handleConfirmDelete}>
                            Continue
                        </Button>
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
                    <Typography id="error-delete-title" variant="h6" component="h2" color="error">
                        Oops, you cannot delete this procedure!
                    </Typography>
                    <Typography id="error-delete-description" mt={2}>
                        This procedure is being used by one or more tramits.
                    </Typography>
                    <Box mt={2} display="flex" justifyContent="flex-end">
                        <Button variant="contained" color="secondary" onClick={() => setErrorModal(false)}>
                            Close
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </div>
    );
};

export default CustomButtonWithMenu;