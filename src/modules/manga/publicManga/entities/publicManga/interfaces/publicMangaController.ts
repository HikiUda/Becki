import { MangaListItemPagination } from '../../../dto/mangaListItem.dto';
import { OptionalAuthUserRequest } from 'src/modules/user/auth';
import { MangaListItemLastUpdatedPagination } from '../../../dto/mangaListItemLastUpdated.dto';
import { MangaListItemLastUpdatedQueryDto } from '../dto/lastUpdatedMangaQuery.dto';
import { MangaListQueryDto } from '../dto/getMangaListQuery';
import { MangaListItemStatisticResponseArrayData } from '../../../dto/mangaListItemStatistic.dto';
import { LangQueryDto } from 'src/shared/dto/query/langQuery.dto';

export interface PublicMangaControllerInterface {
    getMangaList: (
        req: OptionalAuthUserRequest,
        query: MangaListQueryDto,
    ) => Promise<MangaListItemPagination>;
    getLastUpdatedMangas: (
        req: OptionalAuthUserRequest,
        query: MangaListItemLastUpdatedQueryDto,
    ) => Promise<MangaListItemLastUpdatedPagination>;
    getRelatedManga: (
        id: number,
        query: LangQueryDto,
    ) => Promise<MangaListItemStatisticResponseArrayData>;
}
