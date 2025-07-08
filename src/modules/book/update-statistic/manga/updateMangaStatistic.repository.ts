import { Injectable } from '@nestjs/common';
import { UpdateBookStatisticRepositoryInterface } from '../__common/interfaces/updateBookStatisticRepository';
import { MangaId } from 'src/modules/book/_common/model/bookId';
import { PrismaService } from 'src/shared/prisma/prisma.service';
import { computeRate, RateValues, RateValuesCount } from '../__common/model/computeRate';
import { Bookmarks } from '@prisma/client';
import { computeBookmarkStatistic } from '../__common/model/computeBookmark';

@Injectable()
export class UpdateMangaStatisticRepository implements UpdateBookStatisticRepositoryInterface {
    constructor(private prisma: PrismaService) {}
    async updateRateStatistic(bookId: MangaId): Promise<void> {
        const {
            _sum: { rate: rateSum },
            _count: { _all: rateCount },
        } = await this.prisma.mangaRating.aggregate({
            where: { bookId },
            _sum: { rate: true },
            _count: { _all: true },
        });

        const data = (await Promise.all(
            RateValues.map((rate) => this.prisma.mangaRating.count({ where: { bookId, rate } })),
        )) as RateValuesCount;

        const { rate, rateStatistic } = computeRate(rateSum || 0, rateCount, data);

        await this.prisma.mangaStatistic.update({
            where: { bookId },
            data: { rate, rateCount, rateStatistic },
        });

        return;
    }

    async updateBookmarkStatistic(bookId: MangaId): Promise<void> {
        const bookmarkCount = await this.prisma.mangaBookmarks.count({ where: { bookId } });

        const data = (await Promise.all(
            Object.values(Bookmarks).map((bookmark) =>
                this.prisma.mangaBookmarks.count({ where: { bookId, bookmark } }),
            ),
        )) as [number, number, number, number, number];

        const bookmarkStatistic = computeBookmarkStatistic(bookmarkCount, data);

        await this.prisma.mangaStatistic.update({
            where: { bookId },
            data: { bookmarkCount, bookmarkStatistic },
        });

        return;
    }
}
