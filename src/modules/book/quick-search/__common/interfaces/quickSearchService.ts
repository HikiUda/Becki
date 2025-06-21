import { QuickSearchQueryDto } from '../dto/quickSearchQuery.dto';

export interface QuickSearchServiceInterface<T extends unknown[]> {
    getBooks: (query: QuickSearchQueryDto, userId: number | null) => Promise<T>;
    getUserLastQueries: (userId: number) => Promise<string[]>;
    deleteUserLastQuery: (search: string, userId: number) => Promise<void>;
}
