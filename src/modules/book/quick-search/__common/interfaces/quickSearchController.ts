import { AuthUserRequest, OptionalAuthUserRequest } from 'src/modules/user/auth';
import { DeleteQuickSearchLastDto } from '../dto/deleteQuickSearchLast.dto';
import { QuickSearchQueryDto } from '../dto/quickSearchQuery.dto';
import { QuickSearchLastDto } from '../dto/quickSearchLast.dto';

export interface QuickSearchControllerInterface<T> {
    getBooks: (req: OptionalAuthUserRequest, query: QuickSearchQueryDto) => Promise<T>;
    getUserLastQueries: (req: AuthUserRequest) => Promise<QuickSearchLastDto>;
    deleteUserLastQuery: (req: AuthUserRequest, body: DeleteQuickSearchLastDto) => Promise<void>;
}
