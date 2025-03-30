import { LangType } from 'src/common/types/lang';
import { MangaDto } from '../dto/manga.dto';
import { MangaIdsType } from '../../common/types/mangaTypes';
import { MangaListItemDto, MangaListQuery } from '../dto/mangaListItem.dto';
import { MangaListItemStatisticDto } from '../dto/mangaListItemStatistic.dto';

export interface PublicMangaServiceInterface {
    getManga: (id: MangaIdsType, lang: LangType) => Promise<MangaDto>;
    getMangaList: (query: MangaListQuery, lang: LangType) => Promise<MangaListItemDto[]>;
    getMangaQuickSearch: (
        search: string,
        lang: LangType,
        userId: number | null,
    ) => Promise<MangaListItemStatisticDto[]>;
    getUserLastSearchQueries: (userId: number) => Promise<string[]>;
    deleteUserLastSearchQuery: (search: string, userId: number) => Promise<void>;
}
