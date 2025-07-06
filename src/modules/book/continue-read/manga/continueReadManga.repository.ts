import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/prisma/prisma.service';
import { ContinueReadBookRepositoryInterface } from '../__common/interfaces/continueReadBookRepository';
import { ContinueReadBook } from '../__common/dto/continueReadBook.dto';
import {
    ContinueReadBookList,
    ContinueReadBookListQuery,
} from '../__common/dto/continueReadBookList.dto';
import { getContinueReadBookListSelect } from '../__common/prisma/getContinueReadBookListSelect';
import { toContinueReadBookList } from '../__common/prisma/toContinueReadBookList';
import { getContinueReadManga } from './prisma/getContinueReadManga';
import { toContinueReadBook } from '../__common/prisma/toContinueReadBook';
import { UserId } from 'src/modules/user/auth';
import { MangaId } from '../../_common/model/bookId';
import { SetContinueReadMangaParams } from '../__common/dto/setContinueReadBookParams';

@Injectable()
export class ContinueReadMangaRepository implements ContinueReadBookRepositoryInterface {
    constructor(private prisma: PrismaService) {}

    async getContinueReadBookList(
        userId: UserId,
        query: ContinueReadBookListQuery,
    ): Promise<ContinueReadBookList> {
        const data = await this.prisma.mangaBookmarks.findMany({
            where: { userId, show: true },
            orderBy: { updatedAt: 'desc' },
            take: query.limit,
            select: getContinueReadBookListSelect(query.lang),
        });
        return toContinueReadBookList(data, query.lang);
    }

    async getContinueReadBook(userId: UserId | null, bookId: MangaId): Promise<ContinueReadBook> {
        const data = await getContinueReadManga(this.prisma, userId, bookId);
        return toContinueReadBook(data, bookId);
    }

    async setContinueReadBook(
        userId: UserId,
        { mangaId: bookId, chapterId }: SetContinueReadMangaParams,
    ): Promise<void> {
        await this.prisma.mangaBookmarks.update({
            where: { userId_bookId: { userId, bookId } },
            data: {
                show: !!chapterId,
                chapterId: chapterId,
            },
        });
        return;
    }

    async dontShowContinueReadBook(userId: UserId, bookId: MangaId): Promise<void> {
        await this.prisma.mangaBookmarks.updateMany({
            where: { userId, bookId: bookId === 0 ? undefined : bookId },
            data: { show: false },
        });
        return;
    }
}
