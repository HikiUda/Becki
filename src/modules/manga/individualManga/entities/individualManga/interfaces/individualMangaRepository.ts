import { LangType } from 'src/common/dto/query/langQuery.dto';
import { MangaDto } from '../dto/manga.dto';
import { MangaCoverDto } from '../dto/mangaCovers.dto';

export interface IndividualMangaRepositoryInterface {
    getManga: (id: number, lang: LangType, userId?: number) => Promise<MangaDto>;
    getMangaCovers: (mangaId: number) => Promise<MangaCoverDto[]>;
}
