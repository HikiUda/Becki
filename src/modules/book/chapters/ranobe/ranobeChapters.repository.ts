import { Injectable, NotFoundException } from '@nestjs/common';
import { BookChaptersRepositoryInterface } from '../__common/interfaces/bookChapterRepository';
import { PrismaService } from 'src/shared/prisma/prisma.service';
import { UserId } from 'src/modules/authorization';
import { Lang } from 'src/shared/dto/langQuery.dto';
import { BookChapterParams, RanobeChapterParams, RanobeId } from '../../_common/model/bookId';
import { BookChapter } from '../__common/dto/bookChapter.dto';
import { BookChapterList } from '../__common/dto/bookChapterList.dto';
import { BookChapterListQuery } from '../__common/dto/bookChapterListQuery.dto';
import { getRanobeChapterList } from './prisma/getRanobeChapterList';
import { toBookChapterList } from '../__common/prisma/toBookChapterList';
import { getChapterSelect } from '../__common/prisma/getChapterSelect';
import {
    getNextChapterOrderByInput,
    getNextChapterWhereInput,
} from '../__common/prisma/getNextChapter';
import {
    getPrevChapterOrderByInput,
    getPrevChapterWhereInput,
} from '../__common/prisma/getPrevChapter';
import { toBookChapter } from '../__common/prisma/toBookChapter';

@Injectable()
export class RanobeChaptersRepository implements BookChaptersRepositoryInterface {
    constructor(private prisma: PrismaService) {}

    async getChapterList(
        bookId: RanobeId,
        query: BookChapterListQuery,
        userId?: UserId,
    ): Promise<BookChapterList> {
        const data = await getRanobeChapterList(this.prisma, bookId, query, userId);
        return toBookChapterList(data, query);
    }

    async getChapter(
        { ranobeId: bookId, chapterId }: RanobeChapterParams,
        userId?: UserId,
    ): Promise<BookChapter> {
        const chapter = await this.prisma.ranobeChapters.findUnique({
            where: { id: chapterId, publish: true },
            select: getChapterSelect(userId),
        });

        if (!chapter) throw new NotFoundException('Такой главы не существует!');

        const prevChapter = await this.prisma.ranobeChapters.findFirst({
            where: getPrevChapterWhereInput(bookId, chapter.tome, chapter.chapter),
            orderBy: getPrevChapterOrderByInput(),
            select: { id: true, tome: true, chapter: true },
        });

        const nextChapter = await this.prisma.ranobeChapters.findFirst({
            where: getNextChapterWhereInput(bookId, chapter.tome, chapter.chapter),
            orderBy: getNextChapterOrderByInput(),
            select: { id: true, tome: true, chapter: true },
        });

        return toBookChapter(chapter, prevChapter, nextChapter);
    }

    getPages: (params: BookChapterParams) => Promise<any>;
}
