import { Module } from '@nestjs/common';
import { MangaStatisticModule } from './manga/mangaStatistic.module';
import { RanobeStatisticModule } from './ranobe/ranobeStatistic.module';

@Module({
    imports: [MangaStatisticModule, RanobeStatisticModule],
})
export class StatisticModule {}
