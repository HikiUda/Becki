import { Module } from '@nestjs/common';
import { ChapterActionController } from './chapterAction.controller';
import { ChapterActionRepository } from './chapterAction.repository';
import { ChapterActionService } from './chapterAction.service';

@Module({
    controllers: [ChapterActionController],
    providers: [ChapterActionService, ChapterActionRepository],
})
export class ChapterActionModule {}
