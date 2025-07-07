import { Injectable, NotFoundException } from '@nestjs/common';
import { BookStatisticRepositoryInterface } from '../__common/interfaces/bookStatisticRepository';
import { RanobeId } from '../../_common/model/bookId';
import { PrismaService } from 'src/shared/prisma/prisma.service';
import { RateStatisticSchema, RateSummaryStatistic } from '../__common/dto/rateStatistic';
import {
    BookmarkStatisticSchema,
    BookmarkSummaryStatistic,
} from '../__common/dto/bookmarkStatistic.dto';

@Injectable()
export class RanobeStatisticRepository implements BookStatisticRepositoryInterface {
    constructor(private prisma: PrismaService) {}

    async getRateStatistic(bookId: RanobeId): Promise<RateSummaryStatistic> {
        const bookStatistic = await this.prisma.ranobeStatistic.findUnique({
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

    async getBookmarkStatistic(bookId: RanobeId): Promise<BookmarkSummaryStatistic> {
        const bookStatistic = await this.prisma.ranobeStatistic.findUnique({
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
