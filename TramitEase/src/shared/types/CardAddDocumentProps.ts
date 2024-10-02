import { Document } from '../../entities/Document.ts';

export interface CardAddDocumentProps {
    onDocumentSelect?: (document: Document) => void;
    idStepProcedureFolderClient?: number;
    name?: string;
}

export interface CardDocumentProps {
    name?: string;
    path?: string;
    type?: string;
}

export interface  DocumentListProps{
    idStepProcedureClientFolder: number;
    onDocumentSelect?: (document: Document) => void;

}