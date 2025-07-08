import { Module } from '@nestjs/common';
import { PrismaService } from 'src/shared/prisma/prisma.service';
import { UpdateMangaStatisticService } from './manga/updateMangaStatistic.service';
import { UpdateMangaStatisticRepository } from './manga/updateMangaStatistic.repository';
import { UpdateRanobeStatisticService } from './ranobe/updateRanobeStatistic.service';
import { UpdateRanobeStatisticRepository } from './ranobe/updateRanobeStatistic.repository';

@Module({
    providers: [
        UpdateMangaStatisticService,
        UpdateMangaStatisticRepository,
        UpdateRanobeStatisticService,
        UpdateRanobeStatisticRepository,
        PrismaService,
    ],
    exports: [UpdateMangaStatisticService, UpdateRanobeStatisticService],
})
export class UpdateStatisticModule {}
