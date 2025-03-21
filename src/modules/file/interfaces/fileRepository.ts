import { FileSaveReturnType } from '../types/file';

export interface FileRepositoryInterface {
    deleteFiles: (filesUrl: string[]) => Promise<void>;
    saveFiles: (files: Express.Multer.File[], key?: string) => Promise<FileSaveReturnType[]>;
}
