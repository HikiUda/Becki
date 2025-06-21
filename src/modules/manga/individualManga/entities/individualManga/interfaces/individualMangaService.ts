import { LangType } from 'src/shared/dto/query/langQuery.dto';
import { MangaDto } from '../dto/manga.dto';
import { MangaCoverArrayData } from '../dto/mangaCovers.dto';

export interface IndividualMangaServiceInterface {
    getManga: (id: number, lang: LangType, userId?: number) => Promise<MangaDto>;
    getMangaCovers: (mangaId: number) => Promise<MangaCoverArrayData>;
}
