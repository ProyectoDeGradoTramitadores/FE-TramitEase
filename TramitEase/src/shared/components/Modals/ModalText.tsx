import { ConfirmDeleteModalProps } from '../../types/ModalTextProps.ts';
import { Box, Typography } from '@mui/material';
import { Modal } from '@mui/joy';
import React from 'react';
import { modalStyle, textStyle } from './ModalText.styles.ts';
import CustomButton from '../buttons/CustomButton.tsx';

const ModalText: React.FC<ConfirmDeleteModalProps> = ({ isModalOpen,
                                                                   closeModal, confirmDeletion,
                                                                   textTIle, textHeader2 }) => {
    return (
        <div>
            <Modal open={isModalOpen} onClose={closeModal}>
                <Box sx={modalStyle}>
                    <Typography variant="h6" component="h2" sx={textStyle}>
                        {textTIle}
                    </Typography>
                    <Typography sx={{ mt: 2, ...textStyle }}>
                        {textHeader2}
                    </Typography>
                    <Box sx={{ mt: 3, display: 'flex', justifyContent: 'space-between' }}>
                        <CustomButton $textStyle={'bold'} $text={'Cancelar'}
                                      size={'s'} color={'primary'} onClick={closeModal}/>
                        <CustomButton $textStyle={'bold'} $text={'Confirmar'}
                                      size={'s'} color={'ternary'} onClick={confirmDeletion}/>
                    </Box>
                </Box>
            </Modal>
        </div>
    );
};

export default ModalText;