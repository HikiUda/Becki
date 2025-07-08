import { BookIdParam } from 'src/modules/book/_common/model/bookId';
import { RateSummaryStatistic } from '../dto/rateSummaryStatistic.dto';
import { BookmarkSummaryStatistic } from '../dto/bookmarkSummaryStatistic.dto';

export interface BookStatisticControllerInterface {
    getRateStatistic: (params: BookIdParam) => Promise<RateSummaryStatistic>;
    getBookmarkStatistic: (params: BookIdParam) => Promise<BookmarkSummaryStatistic>;
}
