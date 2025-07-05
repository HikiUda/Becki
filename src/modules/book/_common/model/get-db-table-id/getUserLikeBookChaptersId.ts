import { UserId } from 'src/modules/user/auth';
import { BookChapterId } from '../bookId';

export function getUserLikeBookChaptersId(userId: UserId, chapterId: BookChapterId) {
    return `${userId}-${chapterId}`;
}
