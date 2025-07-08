import { Module } from '@nestjs/common';
import { RanobeRateController } from './ranobeRate.controller';
import { PrismaService } from 'src/shared/prisma/prisma.service';
import { RanobeRateService } from './ranobeRate.service';
import { RanobeRateRepository } from './ranobeRate.repository';
import { UpdateStatisticModule } from '../../update-statistic/updateStatistic.module';

@Module({
    imports: [UpdateStatisticModule],
    controllers: [RanobeRateController],
    providers: [RanobeRateService, RanobeRateRepository, PrismaService],
})
export class RanobeRateModule {}
