import { LangType } from 'src/common/dto/query/langQuery.dto';
import { AuthUserRequest, OptionalAuthUserRequest } from 'src/modules/user/auth';
import { MangaListItemStatisticResponseArrayData } from '../../dto/mangaListItem/mangaListItemStatistic.dto';
import { ResponseArrayData } from 'src/common/types/pagination';
import { DeleteSearchDto } from '../../dto/quickSearch/deleteSearchDto';
import { QuickSearchQueryDto } from '../../dto/quickSearch/QuickSearchQueryDto';

export interface QuickSearchControllerInterface {
    getMangaQuickSearch: (
        query: QuickSearchQueryDto,
        req: OptionalAuthUserRequest,
    ) => Promise<MangaListItemStatisticResponseArrayData>;
    getUserLastSearchQueries: (req: AuthUserRequest) => Promise<ResponseArrayData<string>>;
    deleteUserLastSearchQuery: (req: AuthUserRequest, search: DeleteSearchDto) => Promise<void>;
}
