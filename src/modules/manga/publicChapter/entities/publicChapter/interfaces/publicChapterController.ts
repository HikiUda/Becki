import { OptionalAuthUserRequest } from 'src/modules/user/auth';
import { ChapterListPagination } from '../dto/chapterList/chapterListItem.dto';
import { ChapterListQuery } from '../dto/chapterList/chapterListQuery';
import { ChapterDto } from '../dto/chapter.dto';
import { LangQueryDto } from 'src/common/dto/query/langQuery.dto';

export interface PublicChapterControllerInterface {
    getChapterList: (
        mangaId: number,
        query: ChapterListQuery,
        req?: OptionalAuthUserRequest,
    ) => Promise<ChapterListPagination>;
    getChapter: (
        chapterId: number,
        query: LangQueryDto,
        req?: OptionalAuthUserRequest,
    ) => Promise<ChapterDto>;
}
