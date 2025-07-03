import { Module } from '@nestjs/common';
import { PrismaService } from 'src/shared/prisma/prisma.service';
import { ContinueReadRanobeController } from './continueReadRanobe.controller';
import { ContinueReadRanobeService } from './continueReadRanobe.service';
import { ContinueReadRanobeRepository } from './continueReadRanobe.repository';

@Module({
    controllers: [ContinueReadRanobeController],
    providers: [ContinueReadRanobeService, ContinueReadRanobeRepository, PrismaService],
})
export class ContinueReadRanobeModule {}
