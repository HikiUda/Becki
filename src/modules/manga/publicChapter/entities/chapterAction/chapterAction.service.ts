import { Injectable } from '@nestjs/common';
import { ChapterActionServiceInterface } from './interfaces/chapterActionService';
import { ChapterActionRepository } from './chapterAction.repository';

@Injectable()
export class ChapterActionService implements ChapterActionServiceInterface {
    constructor(private chapterActionRepository: ChapterActionRepository) {}
    async setUserLikeChapter(chapterId: number, userId: number): Promise<void> {
        await this.chapterActionRepository.setUserLikeChapter(chapterId, userId);
    }
    async setUserViewChapter(chapterId: number, userId: number): Promise<void> {
        await this.chapterActionRepository.setUserViewChapter(chapterId, userId);
    }
}
