import { AuthUserRequest, OptionalAuthUserRequest } from 'src/modules/authorization';
import { ContinueReadBookList, ContinueReadBookListQuery } from '../dto/continueReadBookList.dto';
import { ContinueReadBook } from '../dto/continueReadBook.dto';
import { BookIdParam } from 'src/modules/book/_common/model/bookId';
import { SetContinueReadBookParams } from '../dto/setContinueReadBookParams';

export interface ContinueReadBookControllerInterface {
    getContinueReadBookList: (
        req: AuthUserRequest,
        query: ContinueReadBookListQuery,
    ) => Promise<ContinueReadBookList>;
    getContinueReadBook: (
        req: OptionalAuthUserRequest,
        params: BookIdParam,
    ) => Promise<ContinueReadBook>;
    setContinueReadBook: (req: AuthUserRequest, params: SetContinueReadBookParams) => Promise<void>;
    dontShowContinueReadBook: (req: AuthUserRequest, params: BookIdParam) => Promise<void>;
}
