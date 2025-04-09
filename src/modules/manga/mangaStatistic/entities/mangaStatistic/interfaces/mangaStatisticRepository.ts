import { BookmarkStatisticType } from '../dto/bookmarkStatistic';
import { RateFullStatisticType } from '../dto/rateStatistic';

export interface MangaStatisticRepositoryInterface {
    getRateStatistic: (mangaId: number) => Promise<RateFullStatisticType>;
    getBookmarkStatistic: (mangaId: number) => Promise<BookmarkStatisticType>;
}
