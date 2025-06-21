import { LangType } from 'src/shared/dto/query/langQuery.dto';
import { MangaListItemStatisticDto } from '../../../dto/mangaListItemStatistic.dto';

export interface QuickSearchRepositoryInterface {
    getMangaQuickSearch: (search: string, lang: LangType) => Promise<MangaListItemStatisticDto[]>;
    saveUserLastSearchQueries: (search: string, userId: number) => Promise<void>;
    getUserLastSearchQueries: (userId: number) => Promise<string[]>;
    deleteUserLastSearchQuery: (search: string, userId: number) => Promise<void>;
}
