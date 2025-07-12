import { BookChapterParams, BookIdParam } from 'src/modules/book/_common/model/bookId';
import { OptionalAuthUserRequest } from 'src/modules/user/auth';
import { BookChapter } from '../dto/bookChapter.dto';
import { BookChapterListQuery } from '../dto/bookChapterListQuery.dto';
import { BookChapterList } from '../dto/bookChapterList.dto';

export interface BookChaptersControllerInterface {
    getChapterList: (
        req: OptionalAuthUserRequest,
        params: BookIdParam,
        query: BookChapterListQuery,
    ) => Promise<BookChapterList>;
    getChapter: (req: OptionalAuthUserRequest, params: BookChapterParams) => Promise<BookChapter>;
    getPages: (params: BookChapterParams) => Promise<any>;
}
