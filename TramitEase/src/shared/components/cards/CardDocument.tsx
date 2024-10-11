import React, { useState } from 'react';
import { CardContainer } from './CardAddDocument.styles';
import { CardDocumentProps } from '../../types/CardAddDocumentProps';
import { TitleTypography } from '../../../pages/clientsFolderPage/ClientsFolderPage.styles.ts';
import { Dialog, DialogContent, DialogTitle } from '@mui/material';

const CardDocument: React.FC<CardDocumentProps> = ({ name, path, type }) => {
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        console.log("url", path);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const renderDocumentContent = () => {
        if (type === 'application/pdf') {
            return <div>
                <iframe src={path} width="100%" height="600px" title={name}></iframe>
            </div>;
        } else if (
            type === 'application/msword' ||
            type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
        ) {
            return (
                <div>
                    <p>
                        This document is a Word file. You can{' '}
                        <a href={path} download rel="noopener noreferrer">
                            download
                        </a>{' '}
                        the document and view it locally.
                    </p>
                </div>
            );
        } else {
            return <p>Unsupported document type.</p>;
        }
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <CardContainer onClick={handleClickOpen}/>

            <TitleTypography variant="h6" gutterBottom>
                {name}
            </TitleTypography>

            <Dialog open={open} onClose={handleClose} fullWidth maxWidth="lg">
                <DialogTitle>{name}</DialogTitle>
                <DialogContent>{renderDocumentContent()}</DialogContent>
            </Dialog>
        </div>
    );
};

export default CardDocument;