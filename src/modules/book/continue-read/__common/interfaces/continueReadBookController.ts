import { AuthUserRequest, OptionalAuthUserRequest } from 'src/modules/user/auth';
import { ContinueReadBookList, ContinueReadBookListQuery } from '../dto/continueReadBookList.dto';
import { ContinueReadBook } from '../dto/continueReadBook.dto';

export interface ContinueReadBookControllerInterface {
    getContinueReadManga: (
        req: AuthUserRequest,
        query: ContinueReadBookListQuery,
    ) => Promise<ContinueReadBookList>;
    getContinueReadBook: (
        req: OptionalAuthUserRequest,
        bookId: number,
    ) => Promise<ContinueReadBook>;
    setContinueReadBook: (
        req: AuthUserRequest,
        bookId: number,
        chapterId: number | null,
    ) => Promise<void>;
    dontShowContinueReadManga: (req: AuthUserRequest, bookId: number) => Promise<void>;
}
