import { BadRequestException, Injectable } from '@nestjs/common';
import { MangaStatisticRepositoryInterface } from './interfaces/mangaStatisticRepository';
import { BookmarkStatisticType } from './dto/bookmarkStatistic';
import { RateFullStatisticType } from './dto/rateStatistic';
import { getRateStatistic } from './prisma/getRateStatistic';
import { getBookmarkStatistic } from './prisma/getBookmarkStatistic';

@Injectable()
export class MangaStatisticRepository implements MangaStatisticRepositoryInterface {
    constructor() {}
    async getRateStatistic(mangaId: number): Promise<RateFullStatisticType> {
        const data = await getRateStatistic(mangaId);
        if (!data) throw new BadRequestException('Such manga dont exsist');
        return data;
    }
    async getBookmarkStatistic(mangaId: number): Promise<BookmarkStatisticType> {
        const data = await getBookmarkStatistic(mangaId);
        if (!data) throw new BadRequestException('Such manga dont exsist');
        return data;
    }
}
