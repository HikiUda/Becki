import { BookId } from 'src/modules/book/_common/model/bookId';
import { UserId } from 'src/modules/authorization';
import { AddBookBookmarkDto } from '../dto/addBookBookmark.dto';
import { UserBookBookmark } from '../dto/userBookBookmark.dto';

export interface BookBookmarksRepositoryInterface {
    getBookmark: (bookId: BookId, userId: UserId) => Promise<UserBookBookmark>;
    setBookmark: (bookId: BookId, userId: UserId, data: AddBookBookmarkDto) => Promise<void>;
    deleteBookmark: (bookId: BookId, userId: UserId) => Promise<void>;
}
