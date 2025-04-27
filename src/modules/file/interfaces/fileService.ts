import { LangType } from 'src/common/dto/query/langQuery.dto';
import { FileSaveReturnType } from '../types/file';

export interface FileServiceInterface {
    saveMangaBanner: (banner: Express.Multer.File, mangaId: number) => Promise<FileSaveReturnType>;
    saveMangaCovers: (
        covers: Express.Multer.File[],
        mangaId: number,
    ) => Promise<FileSaveReturnType[]>;
    saveChapterPage: (
        page: Express.Multer.File,
        mangaId: number,
        chapterId: number,
        lang: LangType,
    ) => Promise<FileSaveReturnType>;
    deleteFiles: (filesUrl: string[]) => Promise<void>;
}
