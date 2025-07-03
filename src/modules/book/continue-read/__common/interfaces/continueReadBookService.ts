import { ContinueReadBookList, ContinueReadBookListQuery } from '../dto/continueReadBookList.dto';
import { ContinueReadBook } from '../dto/continueReadBook.dto';
import { SetContinueReadBookParams } from '../dto/setContinueReadBookParams';
import { UserId } from 'src/modules/user/auth';
import { BookId } from 'src/modules/book/_common/model/bookId';

export interface ContinueReadBookServiceInterface {
    getContinueReadBookList: (
        userId: UserId,
        lang: ContinueReadBookListQuery,
    ) => Promise<ContinueReadBookList>;
    getContinueReadBook: (userId: UserId | null, bookId: BookId) => Promise<ContinueReadBook>;
    setContinueReadBook: (userId: number, params: SetContinueReadBookParams) => Promise<void>;
    dontShowContinueReadBook: (userId: UserId, bookId: BookId) => Promise<void>;
}
