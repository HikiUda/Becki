import { BookId } from 'src/modules/book/_common/model/bookId';
import { UserId } from 'src/modules/authorization';
import { UserBookRate } from '../dto/userBookRate.dto';

export interface BookRateRepositoryInterface {
    getRate: (bookId: BookId, userId: UserId) => Promise<UserBookRate>;
    setRate: (bookId: BookId, userId: UserId, rate: number) => Promise<void>;
    deleteRate: (bookId: BookId, userId: UserId) => Promise<void>;
}
