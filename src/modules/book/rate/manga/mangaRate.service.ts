import { Injectable } from '@nestjs/common';
import { MangaRateRepository } from './mangaRate.repository';
import { BookRateServiceInterface } from '../__common/interfaces/bookRateService';
import { UserId } from 'src/modules/user/auth';
import { MangaId } from '../../_common/model/bookId';
import { UserBookRate } from '../__common/dto/userBookRate.dto';
import { UpdateMangaStatisticService } from '../../statistic/updateStatistic.module';

@Injectable()
export class MangaRateService implements BookRateServiceInterface {
    constructor(
        private repository: MangaRateRepository,
        private updateStatistic: UpdateMangaStatisticService,
    ) {}

    async getRate(bookId: MangaId, userId: UserId): Promise<UserBookRate> {
        return await this.repository.getRate(bookId, userId);
    }
    async setRate(bookId: MangaId, userId: UserId, rate: number): Promise<void> {
        await this.repository.setRate(bookId, userId, rate);
        this.updateStatistic.updateRateStatistic(bookId);
        return;
    }
    async deleteRate(bookId: MangaId, userId: UserId): Promise<void> {
        await this.repository.deleteRate(bookId, userId);
        this.updateStatistic.updateRateStatistic(bookId);
        return;
    }
}
