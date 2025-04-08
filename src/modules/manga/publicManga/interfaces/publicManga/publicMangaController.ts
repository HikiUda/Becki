import { LangQueryDto } from 'src/common/dto/query/langQuery.dto';
import { MangaListItemPagination } from '../../dto/mangaListItem/mangaListItem.dto';
import { AuthUserRequest, OptionalAuthUserRequest } from 'src/modules/user/auth';
import { MangaListItemLastUpdatedPagination } from '../../dto/mangaListItem/mangaListItemLastUpdated.dto';
import { MangaListItemLastUpdatedQueryDto } from '../../dto/publicManga/lastUpdatedMangaQuery.dto';
import { MangaListItemContinueReadResponseArrayData } from '../../dto/mangaListItem/mangaListItemContinueRead.dto';
import { MangaListQueryDto } from '../../dto/publicManga/getMangaListQuery';

export interface PublicMangaControllerInterface {
    getMangaList: (
        req: OptionalAuthUserRequest,
        query: MangaListQueryDto,
    ) => Promise<MangaListItemPagination>;
    getLastUpdatedMangas: (
        req: OptionalAuthUserRequest,
        query: MangaListItemLastUpdatedQueryDto,
    ) => Promise<MangaListItemLastUpdatedPagination>;
    getContinueReadManga: (
        req: AuthUserRequest,
        query: LangQueryDto,
    ) => Promise<MangaListItemContinueReadResponseArrayData>;
    dontShowContinueReadManga: (req: AuthUserRequest, mangaId: number) => Promise<void>;
}
