import { BookChapterParams } from 'src/modules/book/_common/model/bookId';
import { UserId } from 'src/modules/user/auth';
import { UserLikeBookChapterDto } from '../dto/userLikeBookChapter.dto';

export interface UserBookChapterActionsServiceInterface {
    addUserViewChapter: (params: BookChapterParams, userId: UserId) => Promise<void>;
    getUserLikeChapter: (
        params: BookChapterParams,
        userId?: UserId,
    ) => Promise<UserLikeBookChapterDto>;
    setUserLikeChapter: (params: BookChapterParams, userId: UserId) => Promise<void>;
}
