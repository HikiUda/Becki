import { LangType } from 'src/common/dto/query/langQuery.dto';
import { ChapterDto } from '../dto/chapter.dto';
import { ChapterListPagination } from '../dto/chapterList/chapterListItem.dto';
import { ChapterListQuery } from '../dto/chapterList/chapterListQuery';

export interface PublicChapterRepositoryInterface {
    getChapterList: (
        mangaId: number,
        query: ChapterListQuery,
        userId?: number,
    ) => Promise<ChapterListPagination>;
    getChapter: (chapterId: number, lang: LangType, userId?: number) => Promise<ChapterDto>;
}
