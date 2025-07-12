import { BookChapterParams, BookId } from 'src/modules/book/_common/model/bookId';
import { BookChapterListQuery } from '../dto/bookChapterListQuery.dto';
import { UserId } from 'src/modules/user/auth';
import { BookChapterList } from '../dto/bookChapterList.dto';
import { BookChapter } from '../dto/bookChapter.dto';

export interface BookChaptersServiceInterface {
    getChapterList: (
        bookId: BookId,
        query: BookChapterListQuery,
        userId?: UserId,
    ) => Promise<BookChapterList>;
    getChapter: (params: BookChapterParams, userId?: UserId) => Promise<BookChapter>;
    getPages: (params: BookChapterParams) => Promise<any>;
}
