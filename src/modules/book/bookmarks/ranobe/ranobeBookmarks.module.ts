import { Module } from '@nestjs/common';
import { RanobeBookmarksController } from './ranobeBookmarks.controller';
import { RanobeBookmarksService } from './ranobeBookmarks.service';
import { RanobeBookmarksRepository } from './ranobeBookmarks.repository';
import { PrismaService } from 'src/shared/prisma/prisma.service';
import { UpdateStatisticModule } from '../../update-statistic/updateStatistic.module';

@Module({
    imports: [UpdateStatisticModule],
    controllers: [RanobeBookmarksController],
    providers: [RanobeBookmarksService, RanobeBookmarksRepository, PrismaService],
})
export class ranobeBookmarksModule {}
