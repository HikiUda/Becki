import { Injectable, NotFoundException } from '@nestjs/common';
import { BookStatisticRepositoryInterface } from '../__common/interfaces/bookStatisticRepository';
import { MangaId } from '../../_common/model/bookId';
import { PrismaService } from 'src/shared/prisma/prisma.service';
import { RateSummaryStatistic } from '../__common/dto/rateSummaryStatistic.dto';
import { RateStatisticSchema } from '../../_common/model/bookStatistic';
import { BookmarkSummaryStatistic } from '../__common/dto/bookmarkSummaryStatistic.dto';
import { BookmarkStatisticSchema } from '../../_common/model/bookStatistic';

@Injectable()
export class MangaStatisticRepository implements BookStatisticRepositoryInterface {
    constructor(private prisma: PrismaService) {}

    async getRateStatistic(bookId: MangaId): Promise<RateSummaryStatistic> {
        const bookStatistic = await this.prisma.mangaStatistic.findUnique({
            where: { bookId },
            select: { rate: true, rateCount: true, rateStatistic: true },
        });
        if (!bookStatistic) throw new NotFoundException('Такой манги не существует');
        return {
            rate: bookStatistic.rate,
            count: bookStatistic.rateCount,
            statistic: RateStatisticSchema.parse(bookStatistic.rateStatistic),
        };
    }

    async getBookmarkStatistic(bookId: MangaId): Promise<BookmarkSummaryStatistic> {
        const bookStatistic = await this.prisma.mangaStatistic.findUnique({
            where: { bookId },
            select: { bookmarkCount: true, bookmarkStatistic: true },
        });
        if (!bookStatistic) throw new NotFoundException('Такой манги не существует');
        return {
            count: bookStatistic.bookmarkCount,
            statistic: BookmarkStatisticSchema.parse(bookStatistic.bookmarkStatistic),
        };
    }
}
