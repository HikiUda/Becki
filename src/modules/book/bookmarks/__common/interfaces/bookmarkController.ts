import { BookIdParam } from 'src/modules/book/_common/model/bookId';
import { AuthUserRequest } from 'src/modules/user/auth';
import { UserBookBookmark } from '../dto/userBookBookmark.dto';
import { AddBookBookmarkDto } from '../dto/addBookBookmark.dto';

export interface BookBookmarksControllerInterface {
    getBookmark: (req: AuthUserRequest, params: BookIdParam) => Promise<UserBookBookmark>;
    setBookmark: (
        req: AuthUserRequest,
        params: BookIdParam,
        body: AddBookBookmarkDto,
    ) => Promise<void>;
    deleteBookmark: (req: AuthUserRequest, params: BookIdParam) => Promise<void>;
}
