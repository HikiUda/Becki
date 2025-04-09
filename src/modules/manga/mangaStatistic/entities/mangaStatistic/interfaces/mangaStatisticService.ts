import { BookmarkStatisticType } from '../dto/bookmarkStatistic';
import { RateFullStatisticType } from '../dto/rateStatistic';

export interface MangaStatisticServiceInterface {
    getRateStatistic: (mangaId: number) => Promise<RateFullStatisticType>;
    getBookmarkStatistic: (mangaId: number) => Promise<BookmarkStatisticType>;
}
