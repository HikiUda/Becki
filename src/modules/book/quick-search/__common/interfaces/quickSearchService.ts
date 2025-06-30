import { QuickSearchBookList } from '../dto/quickSearchBook.dto';
import { QuickSearchLastList } from '../dto/quickSearchLastList.dto';
import { QuickSearchQuery } from '../dto/quickSearchQuery.dto';

export interface QuickSearchServiceInterface {
    getBooks: (query: QuickSearchQuery, userId: number | null) => Promise<QuickSearchBookList>;
    getUserLastQueries: (userId: number) => Promise<QuickSearchLastList>;
    deleteUserLastQuery: (search: string, userId: number) => Promise<void>;
}
