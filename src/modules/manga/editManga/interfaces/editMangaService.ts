import { LangType } from 'src/common/types/lang';
import { EditedMangaDto } from '../dto/editedmanga.dto';
import { MutateMangaDto } from '../dto/mutateManga.dto';
import { MangaFilesUploadType } from '../types/fileUpload';

export interface EditMangaServiceInterface {
    getEditedManga: (id: number, lang: LangType) => Promise<EditedMangaDto>;
    createManga: (
        dto: MutateMangaDto,
        lang: LangType,
        files: MangaFilesUploadType,
    ) => Promise<EditedMangaDto>;
}
