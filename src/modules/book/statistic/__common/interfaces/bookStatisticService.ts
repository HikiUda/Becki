import { BookId } from 'src/modules/book/_common/model/bookId';
import { BookmarkSummaryStatistic } from '../dto/bookmarkStatistic.dto';
import { RateSummaryStatistic } from '../dto/rateStatistic';

export interface BookStatisticServiceInterface {
    getRateStatistic: (bookId: BookId) => Promise<RateSummaryStatistic>;
    getBookmarkStatistic: (bookId: BookId) => Promise<BookmarkSummaryStatistic>;
}
