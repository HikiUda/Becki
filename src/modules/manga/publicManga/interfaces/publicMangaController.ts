import { LangType } from 'src/common/types/lang';
import { MangaDto } from '../dto/manga.dto';
import { MangaIdsType } from '../../common/types/mangaTypes';
import { MangaListItemDto, MangaListQuery } from '../dto/mangaListItem/mangaListItem.dto';
import { MangaListItemStatisticDto } from '../dto/mangaListItem/mangaListItemStatistic.dto';
import { AuthUserRequest, OptionalAuthUserRequest } from 'src/modules/user/auth/types/user';
import {
    MangaListItemLastUpdatedPagination,
    MangaListItemLastUpdatedQuery,
} from '../dto/mangaListItem/mangaListItemLastUpdated.dto';

export interface PublicMangaControllerInterface {
    getManga: (id: MangaIdsType, lang: LangType) => Promise<MangaDto>;
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
}
