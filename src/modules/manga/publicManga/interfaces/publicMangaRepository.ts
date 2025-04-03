import { LangType } from 'src/common/types/lang';
import { MangaListItemDto, MangaListQuery } from '../dto/mangaListItem/mangaListItem.dto';
import { MangaListItemStatisticDto } from '../dto/mangaListItem/mangaListItemStatistic.dto';
import {
    MangaListItemLastUpdatedPagination,
    MangaListItemLastUpdatedQuery,
} from '../dto/mangaListItem/mangaListItemLastUpdated.dto';
import { MangaListItemContinueReadDto } from '../dto/mangaListItem/mangaListItemContinueRead.dto';

export interface PublicMangaRepositoryInterface {
    getMangaList: (query: MangaListQuery, lang: LangType) => Promise<MangaListItemDto[]>;
    getMangaQuickSearch: (search: string, lang: LangType) => Promise<MangaListItemStatisticDto[]>;
    saveUserLastSearchQueries: (search: string, userId: number) => Promise<void>;
    getUserLastSearchQueries: (userId: number) => Promise<string[]>;
    deleteUserLastSearchQuery: (search: string, userId: number) => Promise<void>;
    getLastUpdatedMangas: (
        query: MangaListItemLastUpdatedQuery,
        userId?: number,
    ) => Promise<MangaListItemLastUpdatedPagination>;
    getContinueReadManga: (
        userId: number,
        lang: LangType,
    ) => Promise<MangaListItemContinueReadDto[]>;
    dontShowContinueReadManga: (userId: number, mangaId: number) => Promise<void>;
}
