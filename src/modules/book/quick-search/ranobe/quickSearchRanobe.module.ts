import { Module } from '@nestjs/common';
import { QuickSearchRanobeController } from './quickSearchRanobe.controller';
import { QuickSearchRanobeService } from './quickSearchRanobe.service';
import { QuickSearchRanobeRepository } from './quickSearchRanobe.repository';
import { PrismaService } from 'src/shared/prisma/prisma.service';

@Module({
    controllers: [QuickSearchRanobeController],
    providers: [QuickSearchRanobeService, QuickSearchRanobeRepository, PrismaService],
})
export class QuickSearchRanobeModule {}
