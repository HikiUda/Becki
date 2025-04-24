import { LangType } from 'src/common/dto/query/langQuery.dto';
import { EditedMangaDto } from '../dto/editedmanga.dto';
import { MutateMangaDto } from '../dto/mutateManga/mutateManga.dto';
import { MangaFilesUploadType } from '../../../types/fileUpload';

export interface EditMangaServiceInterface {
    getEditedManga: (id: number, lang: LangType) => Promise<EditedMangaDto>;
    createManga: (
        dto: MutateMangaDto,
        lang: LangType,
        files: MangaFilesUploadType,
    ) => Promise<EditedMangaDto>;
    updateManga: (
        dto: MutateMangaDto,
        mangaId: number,
        lang: LangType,
        banner?: Express.Multer.File,
    ) => Promise<EditedMangaDto>;
    deleteManga: (mangaId: number, lang: LangType) => Promise<EditedMangaDto>;
}
