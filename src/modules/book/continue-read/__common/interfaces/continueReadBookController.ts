import { LangQueryDto } from 'src/shared/dto/query/langQuery.dto';
import { AuthUserRequest } from 'src/modules/user/auth';
import { ContinueReadBookList } from '../dto/continueReadBook.dto';

export interface ContinueReadBookControllerInterface {
    getContinueReadManga: (
        req: AuthUserRequest,
        query: LangQueryDto,
    ) => Promise<ContinueReadBookList>;
    setContinueReadBook: (req: AuthUserRequest, bookId: number, chapterId: number) => Promise<void>;
    dontShowContinueReadManga: (req: AuthUserRequest, bookId: number) => Promise<void>;
}
