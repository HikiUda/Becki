import { Module } from '@nestjs/common';
import { MangaRateController } from './mangaRate.controller';
import { MangaRateService } from './mangaRate.service';
import { MangaRateRepository } from './mangaRate.repository';
import { PrismaService } from 'src/shared/prisma/prisma.service';
import { UpdateStatisticModule } from '../../update-statistic/updateStatistic.module';

@Module({
    imports: [UpdateStatisticModule],
    controllers: [MangaRateController],
    providers: [MangaRateService, MangaRateRepository, PrismaService],
})
export class MangaRateModule {}
