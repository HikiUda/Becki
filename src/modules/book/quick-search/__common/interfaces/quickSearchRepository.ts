import { QuickSearchBook } from '../dto/quickSearchBook.dto';
import { QuickSearchQuery } from '../dto/quickSearchQuery.dto';

export interface QuickSearchRepositoryInterface {
    getBooks: (query: QuickSearchQuery) => Promise<QuickSearchBook[]>;
    getUserLastQueries: (userId: number) => Promise<string[]>;
    setUserLastQueries: (data: string[], userId: number) => Promise<string[]>;
}
