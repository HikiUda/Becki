import { LangQueryDto, LangType } from 'src/shared/dto/query/langQuery.dto';
import { EditedMangaDto } from '../dto/editedmanga.dto';
import { MangaFilesUploadType } from '../../../types/fileUpload';
import { MutateMangaDto } from '../dto/mutateManga/mutateManga.dto';

export interface EditMangaControllerInterface {
    getEditedManga: (id: number, query: LangQueryDto) => Promise<EditedMangaDto>;
    createManga: (
        dto: MutateMangaDto,
        query: LangQueryDto,
        files: MangaFilesUploadType,
    ) => Promise<EditedMangaDto>;
    updateManga: (
        id: number,
        query: LangQueryDto,
        body: MutateMangaDto,
        banner: Express.Multer.File,
    ) => Promise<EditedMangaDto>;
    deleteManga: (id: number, query: LangQueryDto) => Promise<void>;
}
