import { BookId } from 'src/modules/book/_common/model/bookId';

export interface UpdateBookStatisticServiceInterface {
    updateRateStatistic: (bookId: BookId) => void;
    updateBookmarkStatistic: (bookId: BookId) => void;
}
