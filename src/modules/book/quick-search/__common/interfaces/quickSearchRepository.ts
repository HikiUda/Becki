import { QuickSearchQueryDto } from '../dto/quickSearchQuery.dto';

export interface QuickSearchRepositoryInterface<T extends unknown[]> {
    getBooks: (query: QuickSearchQueryDto) => Promise<T>;
    getUserLastQueries: (userId: number) => Promise<string[]>;
    setUserLastQueries: (data: string[], userId: number) => Promise<string[]>;
}
