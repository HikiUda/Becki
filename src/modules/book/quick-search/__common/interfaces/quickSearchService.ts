import { UserId } from 'src/modules/authorization';
import { QuickSearchBookList } from '../dto/quickSearchBook.dto';
import { QuickSearchLastList } from '../dto/quickSearchLastList.dto';
import { QuickSearchQuery } from '../dto/quickSearchQuery.dto';

export interface QuickSearchServiceInterface {
    getBooks: (query: QuickSearchQuery, userId: UserId | null) => Promise<QuickSearchBookList>;
    getUserLastQueries: (userId: UserId) => Promise<QuickSearchLastList>;
    deleteUserLastQuery: (search: string, userId: UserId) => Promise<void>;
}
