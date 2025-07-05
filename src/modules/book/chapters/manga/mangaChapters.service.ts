import { Injectable } from '@nestjs/common';
import { MangaChaptersRepository } from './MangaChapters.repository';
import { BookChaptersServiceInterface } from '../__common/interfaces/bookChapterService';
import { UserId } from 'src/modules/user/auth';
import { Lang } from 'src/shared/dto/langQuery.dto';
import { MangaId, MangaChapterParams } from '../../_common/model/bookId';
import { BookChapter } from '../__common/dto/bookChapter.dto';
import { BookChapterList } from '../__common/dto/bookChapterList.dto';
import { BookChapterListQuery } from '../__common/dto/bookChapterListQuery.dto';

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

    async getChapter(
        params: MangaChapterParams,
        lang: Lang,
        userId?: UserId,
    ): Promise<BookChapter> {
        return this.repository.getChapter(params, lang, userId);
    }
}
