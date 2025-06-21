import { LangType } from 'src/shared/dto/query/langQuery.dto';
import { AuthUserRequest, OptionalAuthUserRequest } from 'src/modules/user/auth';
import { MangaListItemStatisticResponseArrayData } from '../../../dto/mangaListItemStatistic.dto';
import { ResponseArrayData } from 'src/shared/types/pagination';
import { DeleteSearchDto } from '../dto/deleteSearchDto';
import { QuickSearchQueryDto } from '../dto/QuickSearchQueryDto';

export interface QuickSearchControllerInterface {
    getMangaQuickSearch: (
        query: QuickSearchQueryDto,
        req: OptionalAuthUserRequest,
    ) => Promise<MangaListItemStatisticResponseArrayData>;
    getUserLastSearchQueries: (req: AuthUserRequest) => Promise<ResponseArrayData<string>>;
    deleteUserLastSearchQuery: (req: AuthUserRequest, search: DeleteSearchDto) => Promise<void>;
}
