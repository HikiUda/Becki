import { LangQueryDto } from 'src/common/dto/query/langQuery.dto';
import { ChapterPagesDto } from '../dto/chapterPages.scheme';
import { GetMangaChapterIdDto } from '../../../dto/getMangaChapterId.dto';
import { DeleteChapterPageDto } from '../dto/deleteChapterPage.dto';
import { AddPageQuery } from '../dto/addPageQuery';

export interface EditChapterPagesControllerInterface {
    getChapterPages: (ids: GetMangaChapterIdDto, query: LangQueryDto) => Promise<ChapterPagesDto>;
    setChapterPages: (
        ids: GetMangaChapterIdDto,
        body: ChapterPagesDto,
        query: LangQueryDto,
    ) => Promise<ChapterPagesDto>;
    addLangChapterPages: (
        ids: GetMangaChapterIdDto,
        body: LangQueryDto,
    ) => Promise<ChapterPagesDto>;
    deleteLangChapterPages: (ids: GetMangaChapterIdDto, body: LangQueryDto) => Promise<void>;
    addPage: (
        ids: GetMangaChapterIdDto,
        page: Express.Multer.File,
        query: AddPageQuery,
    ) => Promise<ChapterPagesDto | void>;
    deletePage: (
        ids: GetMangaChapterIdDto,
        body: DeleteChapterPageDto,
        query: LangQueryDto,
    ) => Promise<void>;
}
