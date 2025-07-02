import { ContinueReadBookList, ContinueReadBookListQuery } from '../dto/continueReadBookList.dto';
import { ContinueReadBook } from '../dto/continueReadBook.dto';

export interface ContinueReadBookRepositoryInterface {
    getContinueReadBookList: (
        userId: number,
        lang: ContinueReadBookListQuery,
    ) => Promise<ContinueReadBookList>;
    getContinueReadBook: (userId: number | null, bookId: number) => Promise<ContinueReadBook>;
    setContinueReadBook: (
        userId: number,
        bookId: number,
        chapterId: number | null,
    ) => Promise<void>;
    dontShowContinueReadBook: (userId: number, bookId: number) => Promise<void>;
}
