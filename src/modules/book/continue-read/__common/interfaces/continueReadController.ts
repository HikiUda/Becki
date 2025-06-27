import { LangQueryDto } from 'src/shared/dto/query/langQuery.dto';
import { AuthUserRequest } from 'src/modules/user/auth';
import { ResponseArrayData } from 'src/shared/types/pagination';

export interface ContinueReadControllerInterface<T extends ResponseArrayData<unknown>> {
    getContinueReadBook: (req: AuthUserRequest, query: LangQueryDto) => Promise<T>;
    dontShowContinueReadBook: (req: AuthUserRequest, bookId: number) => Promise<void>;
}
