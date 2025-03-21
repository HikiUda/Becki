import { FileSaveReturnType } from '../types/file';

export interface FileServiceInterface {
    saveMangaBanner: (banner: Express.Multer.File, mangaId: number) => Promise<FileSaveReturnType>;
    saveMangaCovers: (
        covers: Express.Multer.File[],
        mangaId: number,
    ) => Promise<FileSaveReturnType[]>;
    deleteFiles: (filesUrl: string[]) => Promise<void>;
}
