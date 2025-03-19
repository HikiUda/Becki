import { LangType } from 'src/common/types/lang';
import { MangaDto } from '../dto/manga.dto';

export interface PublicMangaControllerInterface {
    getManga: (id: number, lang: LangType) => Promise<MangaDto>;
}
