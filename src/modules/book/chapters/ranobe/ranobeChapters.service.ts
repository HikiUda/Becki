import { Injectable } from '@nestjs/common';
import { BookChaptersServiceInterface } from '../__common/interfaces/bookChapterService';
import { UserId } from 'src/modules/user/auth';
import { Lang } from 'src/shared/dto/langQuery.dto';
import { RanobeId, RanobeChapterParams, BookChapterParams } from '../../_common/model/bookId';
import { BookChapter } from '../__common/dto/bookChapter.dto';
import { BookChapterList } from '../__common/dto/bookChapterList.dto';
import { BookChapterListQuery } from '../__common/dto/bookChapterListQuery.dto';
import { RanobeChaptersRepository } from './ranobeChapters.repository';

@Injectable()
export class RanobeChaptersService implements BookChaptersServiceInterface {
    constructor(private repository: RanobeChaptersRepository) {}

    async getChapterList(
        bookId: RanobeId,
        query: BookChapterListQuery,
        userId?: UserId,
    ): Promise<BookChapterList> {
        return this.repository.getChapterList(bookId, query, userId);
    }

    async getChapter(params: RanobeChapterParams, userId?: UserId): Promise<BookChapter> {
        return this.repository.getChapter(params, userId);
    }

    getPages: (params: BookChapterParams) => Promise<any>;
}
