import { BookId } from 'src/modules/book/_common/model/bookId';
import { UserId } from 'src/modules/authorization';
import { UserBookBookmark } from '../dto/userBookBookmark.dto';
import { AddBookBookmarkDto } from '../dto/addBookBookmark.dto';

export interface BookBookmarksServiceInterface {
    getBookmark: (bookId: BookId, userId: UserId) => Promise<UserBookBookmark>;
    setBookmark: (bookId: BookId, userId: UserId, data: AddBookBookmarkDto) => Promise<void>;
    deleteBookmark: (bookId: BookId, userId: UserId) => Promise<void>;
}
