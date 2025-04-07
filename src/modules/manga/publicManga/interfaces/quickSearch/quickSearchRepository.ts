import { LangType } from 'src/common/dto/langQuery.dto';
import { MangaListItemStatisticDto } from '../../dto/mangaListItem/mangaListItemStatistic.dto';

export interface QuickSearchRepositoryInterface {
    getMangaQuickSearch: (search: string, lang: LangType) => Promise<MangaListItemStatisticDto[]>;
    saveUserLastSearchQueries: (search: string, userId: number) => Promise<void>;
    getUserLastSearchQueries: (userId: number) => Promise<string[]>;
    deleteUserLastSearchQuery: (search: string, userId: number) => Promise<void>;
}
