import React, { useRef } from 'react';
import { Document } from '../../../entities/Document';
import { CardContainer, PlusSign } from './CardAddDocument.styles';
import { CardAddDocumentProps } from '../../types/CardAddDocumentProps';
import { uploadFile } from '../../services/firebase/uploadService';

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const VALID_FILE_TYPES = [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
];

const CardAddDocument: React.FC<CardAddDocumentProps> = ({ onDocumentSelect, idStepProcedureFolderClient }) => {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            if (file.size > MAX_FILE_SIZE) {
                alert("El archivo es demasiado grande. El tamaño máximo permitido es de 5 MB.");
                return;
            }

            if (!VALID_FILE_TYPES.includes(file.type)) {
                alert("Por favor, selecciona un archivo PDF o DOC.");
                return;
            }

            uploadFile(file).then((downloadURL) => {
                const newDocument: Document = {
                    idDocument: 0,
                    idStepProcedureFolderClient,
                    fileName: file.name,
                    filePath: downloadURL,
                    mimeType: file.type,
                };
                if (onDocumentSelect) {
                    onDocumentSelect(newDocument);
                } else {
                    console.error('onDocumentSelect no está definido.');
                }
            }).catch((error) => {
                console.error("Error al subir el archivo:", error);
            });
        }
    };

    return (
        <CardContainer onClick={handleClick}>
            <PlusSign>+</PlusSign>
            <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                style={{ display: 'none' }}
            />
        </CardContainer>
    );
};

export default CardAddDocument;
