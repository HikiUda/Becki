import { Injectable } from '@nestjs/common';
import { RanobeRateRepository } from './ranobeRate.repository';
import { BookRateServiceInterface } from '../__common/interfaces/bookRateService';
import { UserId } from 'src/modules/authorization';
import { RanobeId } from '../../_common/model/bookId';
import { UserBookRate } from '../__common/dto/userBookRate.dto';
import { UpdateRanobeStatisticService } from '../../update-statistic';

@Injectable()
export class RanobeRateService implements BookRateServiceInterface {
    constructor(
        private repository: RanobeRateRepository,
        private updateStatistic: UpdateRanobeStatisticService,
    ) {}

    async getRate(bookId: RanobeId, userId: UserId): Promise<UserBookRate> {
        return await this.repository.getRate(bookId, userId);
    }
    async setRate(bookId: RanobeId, userId: UserId, rate: number): Promise<void> {
        await this.repository.setRate(bookId, userId, rate);
        this.updateStatistic.updateRateStatistic(bookId);
        return;
    }
    async deleteRate(bookId: RanobeId, userId: UserId): Promise<void> {
        await this.repository.deleteRate(bookId, userId);
        this.updateStatistic.updateRateStatistic(bookId);
        return;
    }
}
