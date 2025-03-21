import { LangType } from 'src/common/types/lang';
import { EditedMangaCovers, EditedMangaDto } from '../dto/editedmanga.dto';
import { MutateMangaDto } from '../dto/mutateManga.dto';
import { MangaFilesUploadType } from '../types/fileUpload';
import { MangaIdsType } from '../../common/types/mangaTypes';

export interface EditMangaServiceInterface {
    getEditedManga: (id: MangaIdsType, lang: LangType) => Promise<EditedMangaDto>;
    createManga: (
        dto: MutateMangaDto,
        lang: LangType,
        files: MangaFilesUploadType,
    ) => Promise<EditedMangaDto>;
    updateManga: (
        dto: MutateMangaDto,
        banner: Express.Multer.File,
        mangaId: number,
        lang: LangType,
    ) => Promise<EditedMangaDto>;
    deleteManga: (mangaId: number, lang: LangType) => Promise<EditedMangaDto>;

    addMangaCovers: (
        mangaId: number,
        covers: Express.Multer.File[],
    ) => Promise<EditedMangaCovers[]>;
    deleteMangaCovers: (coversId: number[]) => Promise<EditedMangaCovers[]>;
}
