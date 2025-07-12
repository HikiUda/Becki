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
import { getContinueReadRanobe } from './prisma/getContinueReadRanobe';
import { toContinueReadBook } from '../__common/prisma/toContinueReadBook';
import { UserId } from 'src/modules/user/auth';
import { RanobeId } from '../../_common/model/bookId';
import { SetContinueReadRanobeParams } from '../__common/dto/setContinueReadBookParams';

@Injectable()
export class ContinueReadRanobeRepository implements ContinueReadBookRepositoryInterface {
    constructor(private prisma: PrismaService) {}

    async getContinueReadBookList(
        userId: UserId,
        query: ContinueReadBookListQuery,
    ): Promise<ContinueReadBookList> {
        const data = await this.prisma.ranobeBookmarks.findMany({
            where: { userId, show: true },
            orderBy: { updatedAt: 'desc' },
            take: query.limit,
            select: getContinueReadBookListSelect(),
        });
        return toContinueReadBookList(data);
    }

    async getContinueReadBook(userId: UserId | null, bookId: RanobeId): Promise<ContinueReadBook> {
        const data = await getContinueReadRanobe(this.prisma, userId, bookId);
        return toContinueReadBook(data, bookId);
    }

    async setContinueReadBook(
        userId: UserId,
        { ranobeId: bookId, chapterId }: SetContinueReadRanobeParams,
    ): Promise<void> {
        await this.prisma.ranobeBookmarks.update({
            where: { userId_bookId: { userId, bookId } },
            data: {
                show: !!chapterId,
                chapterId: chapterId,
            },
        });
        return;
    }

    async dontShowContinueReadBook(userId: UserId, bookId: RanobeId): Promise<void> {
        await this.prisma.ranobeBookmarks.updateMany({
            where: { userId, bookId: bookId === 0 ? undefined : bookId },
            data: { show: false },
        });
        return;
    }
}
