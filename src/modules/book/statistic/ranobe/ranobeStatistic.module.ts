import { Module } from '@nestjs/common';
import { RanobeStatisticController } from './ranobeStatistic.controller';
import { RanobeStatisticService } from './ranobeStatistic.service';
import { RanobeStatisticRepository } from './ranobeStatistic.repository';
import { PrismaService } from 'src/shared/prisma/prisma.service';

@Module({
    controllers: [RanobeStatisticController],
    providers: [RanobeStatisticService, RanobeStatisticRepository, PrismaService],
})
export class RanobeStatisticModule {}
