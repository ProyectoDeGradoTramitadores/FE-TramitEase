import React, { useRef } from 'react';
import { CardContainer, Modal, ModalContent, PlusSign, ProgressBar } from './CardAddDocument.styles';
import { CardAddDocumentProps } from '../../types/CardAddDocumentProps';
import { useCardAddDocument } from '../../hooks/useCardAddDocument.ts';

const CardAddDocument: React.FC<CardAddDocumentProps> = ({ onDocumentSelect, idStepProcedureFolderClient }) => {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleClick = () => {
        fileInputRef.current?.click();
    };

    const { isUploading, uploadProgress, handleFileChange } =
        useCardAddDocument(onDocumentSelect, idStepProcedureFolderClient);

    return (
        <>
            {isUploading && (
                <Modal>
                    <ModalContent>
                        <h3>Subiendo documento...</h3>
                        <ProgressBar progress={uploadProgress} />
                        <p>{uploadProgress}%</p>
                    </ModalContent>
                </Modal>
            )}

            <CardContainer onClick={handleClick}>
                <PlusSign>+</PlusSign>
                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    style={{ display: 'none' }}
                />
            </CardContainer>
        </>
    );
};

export default CardAddDocument;
