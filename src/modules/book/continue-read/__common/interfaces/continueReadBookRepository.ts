import { ContinueReadBookList, ContinueReadBookListQuery } from '../dto/continueReadBookList.dto';
import { ContinueReadBook } from '../dto/continueReadBook.dto';
import { UserId } from 'src/modules/authorization';
import { BookId } from 'src/modules/book/_common/model/bookId';
import { SetContinueReadBookParams } from '../dto/setContinueReadBookParams';

export interface ContinueReadBookRepositoryInterface {
    getContinueReadBookList: (
        userId: UserId,
        lang: ContinueReadBookListQuery,
    ) => Promise<ContinueReadBookList>;
    getContinueReadBook: (userId: UserId | null, bookId: BookId) => Promise<ContinueReadBook>;
    setContinueReadBook: (userId: UserId, params: SetContinueReadBookParams) => Promise<void>;
    dontShowContinueReadBook: (userId: UserId, bookId: BookId) => Promise<void>;
}
