import { BookIdParam } from 'src/modules/book/_common/model/bookId';
import { RateSummaryStatistic } from '../dto/rateStatistic';
import { BookmarkSummaryStatistic } from '../dto/bookmarkStatistic.dto';

export interface BookStatisticControllerInterface {
    getRateStatistic: (params: BookIdParam) => Promise<RateSummaryStatistic>;
    getBookmarkStatistic: (params: BookIdParam) => Promise<BookmarkSummaryStatistic>;
}
