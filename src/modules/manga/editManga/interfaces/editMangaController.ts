import { LangType } from 'src/common/types/lang';
import { EditedMangaDto } from '../dto/editedmanga.dto';
import { MangaFilesUploadType } from '../types/fileUpload';

export interface EditMangaControllerInterface {
    getEditedManga: (id: number, lang: LangType) => Promise<EditedMangaDto>;
    createManga: (
        body: string,
        lang: LangType,
        files: MangaFilesUploadType,
    ) => Promise<EditedMangaDto>;
}
