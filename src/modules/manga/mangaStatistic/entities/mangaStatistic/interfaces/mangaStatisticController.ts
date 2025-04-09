import { BookmarkStatisticType } from '../dto/bookmarkStatistic';
import { RateFullStatisticType } from '../dto/rateStatistic';

export interface MangaStatisticControllerInterface {
    getRateStatistic: (id: number) => Promise<RateFullStatisticType>;
    getBookmarkStatistic: (id: number) => Promise<BookmarkStatisticType>;
}
