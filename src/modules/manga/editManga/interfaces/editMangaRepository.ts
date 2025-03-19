import { LangType } from 'src/common/types/lang';
import { EditedMangaDto } from '../dto/editedmanga.dto';
import { MutateMangaDto } from '../dto/mutateManga.dto';

export interface EditMangaRepositoryInterface {
    getEditedManga: (id: number, lang: LangType) => Promise<EditedMangaDto>;
    createManga: (dto: MutateMangaDto, lang: LangType) => Promise<EditedMangaDto>;
}
