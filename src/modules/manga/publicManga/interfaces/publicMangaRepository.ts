import { LangType } from 'src/common/types/lang';
import { MangaDto } from '../dto/manga.dto';
import { MangaIdsType } from '../../common/types/mangaTypes';

export interface PublicMangaRepositoryInterface {
    getManga: (id: MangaIdsType, lang: LangType) => Promise<MangaDto>;
}
