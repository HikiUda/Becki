import { LangType } from 'src/common/dto/query/langQuery.dto';
import { MangaListItemStatisticDto } from '../../../dto/mangaListItemStatistic.dto';

export interface QuickSearchServiceInterface {
    getMangaQuickSearch: (
        search: string,
        lang: LangType,
        userId: number | null,
    ) => Promise<MangaListItemStatisticDto[]>;
    getUserLastSearchQueries: (userId: number) => Promise<string[]>;
    deleteUserLastSearchQuery: (search: string, userId: number) => Promise<void>;
}
