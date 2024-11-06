import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Box } from '@mui/material';
import CustomButton from '../buttons/CustomButton.tsx';

interface CommentModalProps {
    open: boolean;
    onClose: () => void;
    onSave: (comment: string) => void;
}

const CommentModal: React.FC<CommentModalProps> = ({ open, onClose, onSave }) => {
    const [showTextField, setShowTextField] = useState(false);
    const [comment, setComment] = useState('');

    const handleSave = () => {
        onSave(comment);
        setComment('');
        setShowTextField(false);
        onClose();
    };

    const handleClose = () => {
        setComment('');
        setShowTextField(false);
        onClose();
    };

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>{showTextField? "Añade comentarios" : "¿Quieres añadir comentarios?"}</DialogTitle>
            <DialogContent>
                {!showTextField && (
                    <Box gap={"23px"} display="flex">
                        <CustomButton
                            color={"ternary"}
                            $textStyle={"bold"}
                            size={"s"}
                            $text={"Si"}
                            onClick={() => setShowTextField(true)}
                        />
                        <CustomButton
                            color={"secondary"}
                            $textStyle={"bold"}
                            size={"s"}
                            $text={"No"}
                            onClick={handleClose}
                        />
                    </Box>
                )}
                {showTextField && (
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Comentario"
                        type="text"
                        fullWidth
                        variant="outlined"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        InputProps={{
                            style: { height: 100 }
                        }}
                        multiline
                        rows={4}
                        style={{ width: '500px' }}
                    />

                )}
            </DialogContent>
            {showTextField && (
                <DialogActions>
                    <CustomButton
                        color={"secondary"}
                        $textStyle={"bold"}
                        size={"s"}
                        $text={"Guardar"}
                        onClick={handleSave}
                    />
                    <CustomButton
                        color={"secondary"}
                        $textStyle={"bold"}
                        size={"s"}
                        $text={"Cancelar"}
                        onClick={handleClose}
                    />
                </DialogActions>
            )}
        </Dialog>
    );
};

export default CommentModal;
