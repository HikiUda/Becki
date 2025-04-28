import { BadRequestException, Injectable } from '@nestjs/common';
import { PublicChapterRepositoryInterface } from './interfaces/publicChapterRepository';
import { ChapterListPagination } from './dto/chapterList/chapterListItem.dto';
import { ChapterListQuery } from './dto/chapterList/chapterListQuery';
import { getChapterList, toChapterListItemDto } from './prisma/getChapterList';
import { getPagination } from 'src/common/helpers/pagination/getPagination';
import { ChapterDto } from './dto/chapter.dto';
import { getChapter, toChapterDto } from './prisma/getChapter/getChapter';
import { getNextChapter } from './prisma/getChapter/getNextChapter';
import { getPrevChapter } from './prisma/getChapter/getPrevChapter';
import { LangType } from 'src/common/dto/query/langQuery.dto';

@Injectable()
export class PublicChapterRepository implements PublicChapterRepositoryInterface {
    constructor() {}
    async getChapter(chapterId: number, lang: LangType, userId?: number): Promise<ChapterDto> {
        const chapter = await getChapter(chapterId, userId);
        if (!chapter) throw new BadRequestException('Такой главы не существует');
        const prevChapter = await getPrevChapter(chapter.tome, chapter.chapter, chapter.mangaId);
        const nextChapter = await getNextChapter(chapter.tome, chapter.chapter, chapter.mangaId);
        return toChapterDto(chapter, prevChapter?.id || null, nextChapter?.id || null, lang);
    }
    async getChapterList(
        mangaId: number,
        query: ChapterListQuery,
        userId?: number,
    ): Promise<ChapterListPagination> {
        const data = await getChapterList(mangaId, query, userId);
        const dto = toChapterListItemDto(data.data, query.lang);
        return {
            data: dto,
            ...getPagination(data.chapterCount, query.page, query.limit),
        };
    }
}
