import { LangQueryDto, LangType } from 'src/common/dto/langQuery.dto';
import { MangaListItemDto, MangaListQuery } from '../../dto/mangaListItem/mangaListItem.dto';
import { AuthUserRequest, OptionalAuthUserRequest } from 'src/modules/user/auth';
import {
    MangaListItemLastUpdatedPagination,
    MangaListItemLastUpdatedQueryDto,
} from '../../dto/mangaListItem/mangaListItemLastUpdated.dto';
import { MangaListItemContinueReadResponseArrayData } from '../../dto/mangaListItem/mangaListItemContinueRead.dto';

export interface PublicMangaControllerInterface {
    getMangaList: (query: MangaListQuery, lang: LangType) => Promise<MangaListItemDto[]>;
    getLastUpdatedMangas: (
        res: OptionalAuthUserRequest,
        query: MangaListItemLastUpdatedQueryDto,
    ) => Promise<MangaListItemLastUpdatedPagination>;
    getContinueReadManga: (
        req: AuthUserRequest,
        query: LangQueryDto,
    ) => Promise<MangaListItemContinueReadResponseArrayData>;
    dontShowContinueReadManga: (req: AuthUserRequest, mangaId: number) => Promise<void>;
}
