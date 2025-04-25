import { Injectable } from '@nestjs/common';
import { ChapterActionRepositoryInterface } from './interfaces/chapterActionRepository';
import { setUserLikeChapter } from './prisma/setUserLikeChapter';
import { setUserViewChapter } from './prisma/setUserViewChapter';

@Injectable()
export class ChapterActionRepository implements ChapterActionRepositoryInterface {
    constructor() {}
    async setUserLikeChapter(chapterId: number, userId: number): Promise<void> {
        await setUserLikeChapter(chapterId, userId);
    }
    async setUserViewChapter(chapterId: number, userId: number): Promise<void> {
        await setUserViewChapter(chapterId, userId);
    }
}
