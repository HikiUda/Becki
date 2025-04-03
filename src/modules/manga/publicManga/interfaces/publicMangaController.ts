import { LangType } from 'src/common/types/lang';
import { MangaListItemDto, MangaListQuery } from '../dto/mangaListItem/mangaListItem.dto';
import { MangaListItemStatisticDto } from '../dto/mangaListItem/mangaListItemStatistic.dto';
import { AuthUserRequest, OptionalAuthUserRequest } from 'src/modules/user/auth/types/user';
import {
    MangaListItemLastUpdatedPagination,
    MangaListItemLastUpdatedQuery,
} from '../dto/mangaListItem/mangaListItemLastUpdated.dto';
import { MangaListItemContinueReadDto } from '../dto/mangaListItem/mangaListItemContinueRead.dto';

export interface PublicMangaControllerInterface {
    getMangaList: (query: MangaListQuery, lang: LangType) => Promise<MangaListItemDto[]>;
    getMangaQuickSearch: (
        search: string,
        lang: LangType,
        req: OptionalAuthUserRequest,
    ) => Promise<MangaListItemStatisticDto[]>;
    getUserLastSearchQueries: (req: AuthUserRequest) => Promise<string[]>;
    deleteUserLastSearchQuery: (req: AuthUserRequest, search: string) => Promise<void>;
    getLastUpdatedMangas: (
        res: OptionalAuthUserRequest,
        query: MangaListItemLastUpdatedQuery,
    ) => Promise<MangaListItemLastUpdatedPagination>;
    getContinueReadManga: (
        req: AuthUserRequest,
        lang: LangType,
    ) => Promise<MangaListItemContinueReadDto[]>;
    dontShowContinueReadManga: (req: AuthUserRequest, mangaId: number) => Promise<void>;
}
