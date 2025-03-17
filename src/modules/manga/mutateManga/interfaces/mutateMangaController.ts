import { MangaDto } from '../../common/dto/manga.dto';
import { MutateMangaDto } from '../dto/mutateManga.dto';

export interface MutateMangaControllerInterface {
    // TODO get UserId throw auth
    createManga: (body: MutateMangaDto) => Promise<MangaDto>;
}
