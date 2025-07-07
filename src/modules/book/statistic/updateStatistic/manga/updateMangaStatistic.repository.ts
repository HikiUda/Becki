import { Injectable } from '@nestjs/common';
import { UpdateBookStatisticRepositoryInterface } from '../interfaces/updateBookStatisticRepository';
import { MangaId } from 'src/modules/book/_common/model/bookId';
import { PrismaService } from 'src/shared/prisma/prisma.service';
import { computeRate, rateValues, rateValuesCount } from '../model/computeRate';
import { Bookmarks } from '@prisma/client';

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

        const data = (await this.prisma.$transaction(
            rateValues.map((rate) => this.prisma.mangaRating.count({ where: { bookId, rate } })),
        )) as rateValuesCount;

        const { rate, rateStatistic } = computeRate(rateSum || 0, rateCount, data);

        await this.prisma.mangaStatistic.update({
            where: { bookId },
            data: { rate, rateCount, rateStatistic },
        });

        return;
    }
    async updateBookmarkStatistic(bookId: MangaId): Promise<void> {
        const bookmarkCount = await this.prisma.mangaBookmarks.count({ where: { bookId } });

        const data = await this.prisma.$transaction(async (prisma) => {
            return await Promise.all([
                prisma.mangaBookmarks.count({ where: { bookId, bookmark: Bookmarks.Reading } }),
                prisma.mangaBookmarks.count({ where: { bookId, bookmark: Bookmarks.Planned } }),
                prisma.mangaBookmarks.count({ where: { bookId, bookmark: Bookmarks.Readed } }),
                prisma.mangaBookmarks.count({ where: { bookId, bookmark: Bookmarks.Abandoned } }),
                prisma.mangaBookmarks.count({ where: { bookId, bookmark: Bookmarks.Postponed } }),
            ]);
        });
        return;
    }
}
