import { MangaDto } from '../../common/dto/manga.dto';
import { MutateMangaDto } from '../dto/mutateManga.dto';

export interface MutateMangaServiceInterface {
    createManga: (dto: MutateMangaDto) => Promise<MangaDto>;
}
