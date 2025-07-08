import { Injectable } from '@nestjs/common';
import { UpdateBookStatisticServiceInterface } from '../__common/interfaces/updateBookStatisticService';
import { MangaId } from 'src/modules/book/_common/model/bookId';
import { UpdateMangaStatisticRepository } from './updateMangaStatistic.repository';
import { Interval } from '@nestjs/schedule';

@Injectable()
export class UpdateMangaStatisticService implements UpdateBookStatisticServiceInterface {
    private updateRateStatisticQueue = new Set<MangaId>();
    private updateBookmarkStatisticQueue = new Set<MangaId>();

    constructor(private repository: UpdateMangaStatisticRepository) {}

    updateRateStatistic(bookId: MangaId): void {
        this.updateRateStatisticQueue.add(bookId);
    }

    updateBookmarkStatistic(bookId: MangaId): void {
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
