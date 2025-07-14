import { Injectable } from '@nestjs/common';
import { BookChaptersServiceInterface } from '../__common/interfaces/bookChapterService';
import { UserId } from 'src/modules/authorization';
import { Lang } from 'src/shared/dto/langQuery.dto';
import { MangaId, MangaChapterParams, BookChapterParams } from '../../_common/model/bookId';
import { BookChapter } from '../__common/dto/bookChapter.dto';
import { BookChapterList } from '../__common/dto/bookChapterList.dto';
import { BookChapterListQuery } from '../__common/dto/bookChapterListQuery.dto';
import { MangaChaptersRepository } from './mangaChapters.repository';
import { PublicMangaChapterPages } from '../../_common/model/mangaChapterPages';

@Injectable()
export class MangaChaptersService implements BookChaptersServiceInterface {
    constructor(private repository: MangaChaptersRepository) {}

    async getChapterList(
        bookId: MangaId,
        query: BookChapterListQuery,
        userId?: UserId,
    ): Promise<BookChapterList> {
        return this.repository.getChapterList(bookId, query, userId);
    }

    async getChapter(params: MangaChapterParams, userId?: UserId): Promise<BookChapter> {
        return this.repository.getChapter(params, userId);
    }

    async getPages(params: BookChapterParams): Promise<PublicMangaChapterPages> {
        const { pages, ...other } = await this.repository.getPages(params);
        return {
            ...other,
            pages: pages.flat(),
        };
    }
}
