import { LangType } from 'src/common/types/lang';
import { EditedMangaCovers, EditedMangaDto } from '../dto/editedmanga.dto';
import { MutateMangaDto } from '../dto/mutateManga.dto';
import { MangaIdsType } from '../../common/types/mangaTypes';

export interface EditMangaRepositoryInterface {
    getEditedManga: (id: MangaIdsType, lang: LangType) => Promise<EditedMangaDto>;
    createManga: (dto: MutateMangaDto) => Promise<number>;
    updateManga: (dto: MutateMangaDto, mangaId: number, lang: LangType) => Promise<EditedMangaDto>;
    deleteManga: (dto: EditedMangaDto) => Promise<number>;
    getMangaCovers: (mangaId: number) => Promise<EditedMangaCovers[]>;
    addCovers: (covers: string[], mangaId: number) => Promise<EditedMangaCovers[]>;
    deleteCovers: (cover: number[]) => Promise<EditedMangaCovers[]>;
    getMangaBanner: (mangaId: number) => Promise<string | null>;
}
