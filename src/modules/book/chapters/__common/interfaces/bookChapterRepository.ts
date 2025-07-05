import { BookChapterParams, BookId } from 'src/modules/book/_common/model/bookId';
import { BookChapterListQuery } from '../dto/bookChapterListQuery.dto';
import { UserId } from 'src/modules/user/auth';
import { BookChapterList } from '../dto/bookChapterList.dto';
import { Lang } from 'src/shared/dto/langQuery.dto';
import { BookChapter } from '../dto/bookChapter.dto';

export interface BookChaptersRepositoryInterface {
    getChapterList: (
        bookId: BookId,
        query: BookChapterListQuery,
        userId?: UserId,
    ) => Promise<BookChapterList>;
    getChapter: (params: BookChapterParams, lang: Lang, userId?: UserId) => Promise<BookChapter>;
}
