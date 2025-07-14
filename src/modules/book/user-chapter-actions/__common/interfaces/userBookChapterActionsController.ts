import { BookChapterParams } from 'src/modules/book/_common/model/bookId';
import { AuthUserRequest, OptionalAuthUserRequest } from 'src/modules/authorization';
import { UserLikeBookChapterDto } from '../dto/userLikeBookChapter.dto';

export interface UserBookChapterActionsControllerInterface {
    addUserViewChapter: (req: AuthUserRequest, params: BookChapterParams) => Promise<void>;
    getUserLikeChapter: (
        req: OptionalAuthUserRequest,
        params: BookChapterParams,
    ) => Promise<UserLikeBookChapterDto>;
    setUserLikeChapter: (req: AuthUserRequest, params: BookChapterParams) => Promise<void>;
}
