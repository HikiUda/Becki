import { LangType } from 'src/common/dto/query/langQuery.dto';
import { EditedMangaCovers, EditedMangaDto } from '../dto/editedmanga.dto';
import { MangaFilesUploadType } from '../types/fileUpload';
import { MangaIdsType } from '../../common/types/mangaTypes';
import { MutateMangaDto } from '../dto/mutateManga.dto';

export interface EditMangaControllerInterface {
    getEditedManga: (id: MangaIdsType, lang: LangType) => Promise<EditedMangaDto>;
    createManga: (
        dto: MutateMangaDto,
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
    getMangaCovers: (mangaId: number) => Promise<EditedMangaCovers[]>;
    addMangaCovers: (
        id: number,
        files: Omit<MangaFilesUploadType, 'banner'>,
    ) => Promise<EditedMangaCovers[]>;
    deleteMangaCovers: (coversId: number[]) => Promise<EditedMangaCovers[]>;
}
