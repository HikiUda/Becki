import { BookId } from 'src/modules/book/_common/model/bookId';
import { BookmarkSummaryStatistic } from '../dto/bookmarkSummaryStatistic.dto';
import { RateSummaryStatistic } from '../dto/rateSummaryStatistic.dto';

export interface BookStatisticServiceInterface {
    getRateStatistic: (bookId: BookId) => Promise<RateSummaryStatistic>;
    getBookmarkStatistic: (bookId: BookId) => Promise<BookmarkSummaryStatistic>;
}
