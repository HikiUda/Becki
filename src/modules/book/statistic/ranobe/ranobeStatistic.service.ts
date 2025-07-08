import { Injectable } from '@nestjs/common';
import { BookStatisticServiceInterface } from '../__common/interfaces/bookStatisticService';
import { RanobeStatisticRepository } from './ranobeStatistic.repository';
import { RanobeId } from '../../_common/model/bookId';
import { BookmarkSummaryStatistic } from '../__common/dto/bookmarkSummaryStatistic.dto';
import { RateSummaryStatistic } from '../__common/dto/rateSummaryStatistic.dto';

@Injectable()
export class RanobeStatisticService implements BookStatisticServiceInterface {
    constructor(private repository: RanobeStatisticRepository) {}

    async getRateStatistic(bookId: RanobeId): Promise<RateSummaryStatistic> {
        return await this.repository.getRateStatistic(bookId);
    }

    async getBookmarkStatistic(bookId: RanobeId): Promise<BookmarkSummaryStatistic> {
        return await this.repository.getBookmarkStatistic(bookId);
    }
}
