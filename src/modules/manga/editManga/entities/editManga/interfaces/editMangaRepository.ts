import { LangType } from 'src/common/dto/query/langQuery.dto';
import { EditedMangaDto } from '../dto/editedmanga.dto';
import { MutateMangaDto } from '../dto/mutateManga/mutateManga.dto';

export interface EditMangaRepositoryInterface {
    getEditedManga: (id: number, lang: LangType) => Promise<EditedMangaDto>;
    createManga: (dto: MutateMangaDto) => Promise<number>;
    updateManga: (dto: MutateMangaDto, mangaId: number, lang: LangType) => Promise<EditedMangaDto>;
    deleteManga: (dto: EditedMangaDto) => Promise<number>;

    getMangaBanner: (mangaId: number) => Promise<string | null>;
}
