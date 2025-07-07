import { Module } from '@nestjs/common';
import { MangaStatisticController } from './mangaStatistic.controller';
import { MangaStatisticService } from './mangaStatistic.service';
import { MangaStatisticRepository } from './mangaStatistic.repository';
import { PrismaService } from 'src/shared/prisma/prisma.service';

@Module({
    controllers: [MangaStatisticController],
    providers: [MangaStatisticService, MangaStatisticRepository, PrismaService],
})
export class MangaStatisticModule {}
