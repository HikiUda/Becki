import { LangType } from 'src/common/types/lang';
import { MangaDto } from '../dto/manga.dto';
import { MangaIdsType } from '../../common/types/mangaTypes';
import { MangaListQuery } from '../dto/mangaListItem.dto';

export interface PublicMangaControllerInterface {
    getManga: (id: MangaIdsType, lang: LangType) => Promise<MangaDto>;
    getMangaList: (query: MangaListQuery, lang: LangType) => Promise<MangaDto>;
}
