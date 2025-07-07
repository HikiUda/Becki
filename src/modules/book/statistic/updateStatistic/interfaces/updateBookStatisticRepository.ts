import { BookId } from 'src/modules/book/_common/model/bookId';

export interface UpdateBookStatisticRepositoryInterface {
    updateRateStatistic: (bookId: BookId) => Promise<void>;
    updateBookmarkStatistic: (bookId: BookId) => Promise<void>;
}
