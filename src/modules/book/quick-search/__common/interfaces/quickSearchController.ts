import { AuthUserRequest, OptionalAuthUserRequest } from 'src/modules/user/auth';
import { DeleteQuickSearchLastDto } from '../dto/deleteQuickSearchLast.dto';
import { QuickSearchQuery } from '../dto/quickSearchQuery.dto';
import { QuickSearchLastList } from '../dto/quickSearchLastList.dto';
import { QuickSearchBookList } from '../dto/quickSearchBook.dto';

export interface QuickSearchControllerInterface {
    getBooks: (
        req: OptionalAuthUserRequest,
        query: QuickSearchQuery,
    ) => Promise<QuickSearchBookList>;
    getUserLastQueries: (req: AuthUserRequest) => Promise<QuickSearchLastList>;
    deleteUserLastQuery: (req: AuthUserRequest, body: DeleteQuickSearchLastDto) => Promise<void>;
}
