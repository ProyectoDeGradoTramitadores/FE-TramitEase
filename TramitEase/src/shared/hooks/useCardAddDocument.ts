import React, { useState } from 'react';
import { uploadFile } from '../services/firebase/uploadService.ts';
import { Document } from '../../entities/Document.ts';

export function useCardAddDocument(onDocumentSelect?: (document: Document) => void,
                                   idStepProcedureFolderClient?: number ) {
    const MAX_FILE_SIZE = 5 * 1024 * 1024;
    const VALID_FILE_TYPES = [
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ];

    const [isUploading, setIsUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);

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

            setIsUploading(true);
            setUploadProgress(0);

            uploadFile(file, (progress) => {
                setUploadProgress(progress);
            }).then((downloadURL) => {
                const newDocument: Document = {
                    idDocument: 0,
                    idStepProcedureFolderClient: idStepProcedureFolderClient,
                    fileName: file.name,
                    filePath: downloadURL,
                    mimeType: file.type,
                };
                if (onDocumentSelect) {
                    onDocumentSelect(newDocument);
                } else {
                    console.error('onDocumentSelect no está definido.');
                }

                setIsUploading(false);
            }).catch((error) => {
                console.error("Error al subir el archivo:", error);
                setIsUploading(false);
            });
        }
    };

    return {
        isUploading,
        uploadProgress,
        handleFileChange
    };
}
