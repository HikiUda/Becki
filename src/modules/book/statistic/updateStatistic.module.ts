import { Module } from '@nestjs/common';
import { UpdateMangaStatisticService } from './updateStatistic/manga/updateMangaStatistic.service';
import { UpdateMangaStatisticRepository } from './updateStatistic/manga/updateMangaStatistic.repository';
import { PrismaService } from 'src/shared/prisma/prisma.service';

@Module({
    providers: [UpdateMangaStatisticService, UpdateMangaStatisticRepository, PrismaService],
    exports: [UpdateMangaStatisticService],
})
export class UpdateStatisticModule {}

export { UpdateMangaStatisticService };
