import { Injectable } from '@nestjs/common';
import { BookStatisticServiceInterface } from '../__common/interfaces/bookStatisticService';
import { MangaStatisticRepository } from './mangaStatistic.repository';
import { MangaId } from '../../_common/model/bookId';
import { BookmarkSummaryStatistic } from '../__common/dto/bookmarkStatistic.dto';
import { RateSummaryStatistic } from '../__common/dto/rateStatistic';

@Injectable()
export class MangaStatisticService implements BookStatisticServiceInterface {
    constructor(private repository: MangaStatisticRepository) {}

    async getRateStatistic(bookId: MangaId): Promise<RateSummaryStatistic> {
        return await this.repository.getRateStatistic(bookId);
    }

    async getBookmarkStatistic(bookId: MangaId): Promise<BookmarkSummaryStatistic> {
        return await this.repository.getBookmarkStatistic(bookId);
    }
}
