import { Injectable } from '@nestjs/common';
import { UpdateBookStatisticServiceInterface } from '../interfaces/updateBookStatisticService';
import { SchedulerRegistry } from '@nestjs/schedule';
import { MangaId } from 'src/modules/book/_common/model/bookId';
import { UpdateMangaStatisticRepository } from './updateMangaStatistic.repository';

@Injectable()
export class UpdateMangaStatisticService implements UpdateBookStatisticServiceInterface {
    constructor(
        private readonly schedulerRegistry: SchedulerRegistry,
        private repository: UpdateMangaStatisticRepository,
    ) {}

    updateRateStatistic(bookId: MangaId): void {
        const name = `manga-${bookId}-rate-statistic`;

        const haveTimeout = this.getTimeout(name);
        if (haveTimeout) return;

        const callback = () => {
            this.repository.updateRateStatistic(bookId);
            this.schedulerRegistry.deleteTimeout(name);
        };
        const timeout = setTimeout(callback, 6000);
        this.schedulerRegistry.addTimeout(name, timeout);
        return;
    }

    updateBookmarkStatistic(bookId: MangaId): void {
        const name = `manga-${bookId}-bookmark-statistic`;

        const haveTimeout = this.getTimeout(name);
        if (haveTimeout) return;

        const callback = () => {
            this.repository.updateBookmarkStatistic(bookId);
            this.schedulerRegistry.deleteTimeout(name);
        };
        const timeout = setTimeout(callback, 1000 * 60 * 60);
        this.schedulerRegistry.addTimeout(name, timeout);
        return;
    }

    private getTimeout(name: string): boolean {
        try {
            this.schedulerRegistry.getTimeout(name);
            return true;
        } catch {
            return false;
        }
    }
}
