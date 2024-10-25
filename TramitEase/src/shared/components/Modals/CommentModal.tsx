import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Box } from '@mui/material';

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
                    <Box>
                        <Button onClick={() => setShowTextField(true)}>Sí</Button>
                        <Button onClick={handleClose}>No</Button>
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
                    <Button onClick={handleSave} color="primary">Guardar</Button>
                    <Button onClick={handleClose} color="secondary">Cancelar</Button>
                </DialogActions>
            )}
        </Dialog>
    );
};

export default CommentModal;
