import React, { useEffect } from 'react';
import { useDocuments } from '../../shared/hooks/useDocuments.ts';
import CardDocument from '../../shared/components/cards/CardDocument.tsx';
import { ListContainer } from './DocumentsList.styles.ts';
import { DocumentListProps } from '../../shared/types/CardAddDocumentProps.ts';
import CardAddDocument from '../../shared/components/cards/CardAddDocument.tsx';

const DocumentsList: React.FC<DocumentListProps> = ({ idStepProcedureClientFolder, onDocumentSelect }) => {
    const { fetchDocumentsByStepProcedureId, documents } = useDocuments();
    console.log("documents", idStepProcedureClientFolder);

    useEffect(() => {
        const fetchData = async () => {
            try {
                await fetchDocumentsByStepProcedureId(idStepProcedureClientFolder);
            } catch (error) {
                console.error('Error fetching documents:', error);
            }
        };

        void fetchData();
    }, [idStepProcedureClientFolder]);

    return (
        <ListContainer>
            {documents.map((document) => (
                <CardDocument
                    key={document.idDocument}
                    name={document.fileName}
                    path={document.filePath}
                    type={document.mimeType}
                />
            ))}
            <CardAddDocument
                onDocumentSelect={onDocumentSelect}
                idStepProcedureFolderClient={idStepProcedureClientFolder}
            />
        </ListContainer>
    );
};

export default DocumentsList;
