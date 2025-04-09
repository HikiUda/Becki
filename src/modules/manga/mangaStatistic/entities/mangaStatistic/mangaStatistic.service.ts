import { Injectable } from '@nestjs/common';
import { MangaStatisticServiceInterface } from './interfaces/mangaStatisticService';
import { MangaStatisticRepository } from './mangaStatistic.repository';
import { BookmarkStatisticType } from './dto/bookmarkStatistic';
import { RateFullStatisticType } from './dto/rateStatistic';

@Injectable()
export class MangaStatisticService implements MangaStatisticServiceInterface {
    constructor(private mangaStatisticRepository: MangaStatisticRepository) {}
    async getRateStatistic(mangaId: number): Promise<RateFullStatisticType> {
        return await this.mangaStatisticRepository.getRateStatistic(mangaId);
    }
    async getBookmarkStatistic(mangaId: number): Promise<BookmarkStatisticType> {
        return await this.mangaStatisticRepository.getBookmarkStatistic(mangaId);
    }
}
