import { UserId } from 'src/modules/user/auth';
import { QuickSearchBook } from '../dto/quickSearchBook.dto';
import { QuickSearchQuery } from '../dto/quickSearchQuery.dto';

export interface QuickSearchRepositoryInterface {
    getBooks: (query: QuickSearchQuery) => Promise<QuickSearchBook[]>;
    getUserLastQueries: (userId: UserId) => Promise<string[]>;
    setUserLastQueries: (data: string[], userId: UserId) => Promise<string[]>;
}
