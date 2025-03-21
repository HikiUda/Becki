import { LangType } from 'src/common/types/lang';
import { EditedMangaCovers, EditedMangaDto } from '../dto/editedmanga.dto';
import { MangaFilesUploadType } from '../types/fileUpload';
import { MangaIdsType } from '../../common/types/mangaTypes';

export interface EditMangaControllerInterface {
    getEditedManga: (id: MangaIdsType, lang: LangType) => Promise<EditedMangaDto>;
    createManga: (
        body: string,
        lang: LangType,
        files: MangaFilesUploadType,
    ) => Promise<EditedMangaDto>;
    updateManga: (
        id: number,
        lang: LangType,
        body: string,
        banner: Express.Multer.File,
    ) => Promise<EditedMangaDto>;
    deleteManga: (id: number, lang: LangType) => Promise<EditedMangaDto>;
    addMangaCovers: (
        id: number,
        files: Omit<MangaFilesUploadType, 'banner'>,
    ) => Promise<EditedMangaCovers[]>;
    deleteMangaCovers: (coversId: number[]) => Promise<EditedMangaCovers[]>;
}
