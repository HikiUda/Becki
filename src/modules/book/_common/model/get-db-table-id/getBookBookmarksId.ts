import { UserId } from 'src/modules/user/auth';
import { BookId } from '../bookId';

export function getBookBookmarksId(userId: UserId, bookId: BookId) {
    return `${userId}-${bookId}`;
}
