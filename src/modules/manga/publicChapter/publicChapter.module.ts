import { Module } from '@nestjs/common';
import { PublicChapterService } from './entities/publicChapter/publicChapter.service';
import { PublicChapterRepository } from './entities/publicChapter/publicChapter.repository';
import { PublicChapterController } from './entities/publicChapter/publicChapter.controller';
import { ChapterActionModule } from './entities/chapterAction/chapterAction.module';

@Module({
    imports: [ChapterActionModule],
    controllers: [PublicChapterController],
    providers: [PublicChapterService, PublicChapterRepository],
})
export class PublicChapterModule {}
