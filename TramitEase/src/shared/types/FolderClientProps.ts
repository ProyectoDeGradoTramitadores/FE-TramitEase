import { ClientFolder } from '../../entities/ClientFolder.ts';

export interface FolderClientViewComponentProps {
    folderName: string;
    onClick?: () => void;
}

export interface FolderClientsViewComponentProps {
    clientFolders: ClientFolder[];
    onFolderClick: (folderId: number) => void;
}
