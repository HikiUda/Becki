import { Module } from '@nestjs/common';
import { MangaStatisticController } from './entities/mangaStatistic/mangaStatistic.controller';
import { MangaStatisticService } from './entities/mangaStatistic/mangaStatistic.service';
import { MangaStatisticRepository } from './entities/mangaStatistic/mangaStatistic.repository';

@Module({
    controllers: [MangaStatisticController],
    providers: [MangaStatisticService, MangaStatisticRepository],
})
export class MangaStatisticModule {}
