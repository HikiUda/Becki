import { UserId } from 'src/modules/user/auth';
import { BookChapterId } from '../bookId';

export function getUserViewBookChaptersId(userId: UserId, chapterId: BookChapterId) {
    return `${userId}-${chapterId}`;
}
