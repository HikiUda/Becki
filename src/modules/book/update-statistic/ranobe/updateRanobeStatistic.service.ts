import { Injectable } from '@nestjs/common';
import { UpdateBookStatisticServiceInterface } from '../__common/interfaces/updateBookStatisticService';
import { RanobeId } from 'src/modules/book/_common/model/bookId';
import { UpdateRanobeStatisticRepository } from './updateRanobeStatistic.repository';
import { Interval } from '@nestjs/schedule';

@Injectable()
export class UpdateRanobeStatisticService implements UpdateBookStatisticServiceInterface {
    private updateRateStatisticQueue = new Set<RanobeId>();
    private updateBookmarkStatisticQueue = new Set<RanobeId>();

    constructor(private repository: UpdateRanobeStatisticRepository) {}

    updateRateStatistic(bookId: RanobeId): void {
        this.updateRateStatisticQueue.add(bookId);
    }

    updateBookmarkStatistic(bookId: RanobeId): void {
        this.updateBookmarkStatisticQueue.add(bookId);
    }

    @Interval(5000)
    private intervalUpdateRateStatistic() {
        const iterator = this.updateRateStatisticQueue.values();
        const first = iterator.next();
        if (first.done) return;

        this.repository.updateRateStatistic(first.value);
        this.updateRateStatisticQueue.delete(first.value);
    }

    @Interval(5000)
    private intervalUpdateBookmarkStatistic() {
        const iterator = this.updateBookmarkStatisticQueue.values();
        const first = iterator.next();
        if (first.done) return;

        this.repository.updateBookmarkStatistic(first.value);
        this.updateBookmarkStatisticQueue.delete(first.value);
    }
}
