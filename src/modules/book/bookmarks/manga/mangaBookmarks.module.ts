import { Module } from '@nestjs/common';
import { MangaBookmarksController } from './mangaBookmarks.controller';
import { MangaBookmarksService } from './mangaBookmarks.service';
import { MangaBookmarksRepository } from './mangaBookmarks.repository';
import { PrismaService } from 'src/shared/prisma/prisma.service';
import { UpdateStatisticModule } from '../../update-statistic/updateStatistic.module';

@Module({
    imports: [UpdateStatisticModule],
    controllers: [MangaBookmarksController],
    providers: [MangaBookmarksService, MangaBookmarksRepository, PrismaService],
})
export class MangaBookmarksModule {}
