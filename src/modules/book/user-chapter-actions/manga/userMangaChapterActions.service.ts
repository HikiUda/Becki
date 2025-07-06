import { Injectable } from '@nestjs/common';
import { UserBookChapterActionsServiceInterface } from '../__common/interfaces/userBookChapterActionsService';
import { UserMangaChapterActionsRepository } from './userMangaChapterActions.repository';
import { UserId } from 'src/modules/user/auth';
import { MangaChapterParams } from '../../_common/model/bookId';
import { UserLikeBookChapterDto } from '../__common/dto/userLikeBookChapter.dto';

@Injectable()
export class UserMangaChapterActionsService implements UserBookChapterActionsServiceInterface {
    constructor(private repository: UserMangaChapterActionsRepository) {}
    async addUserViewChapter(params: MangaChapterParams, userId: UserId): Promise<void> {
        await this.repository.addUserViewChapter(params, userId);
        return;
    }
    async getUserLikeChapter(
        params: MangaChapterParams,
        userId?: UserId,
    ): Promise<UserLikeBookChapterDto> {
        return await this.repository.getUserLikeChapter(params, userId);
    }
    async setUserLikeChapter(params: MangaChapterParams, userId: UserId): Promise<void> {
        await this.repository.setUserLikeChapter(params, userId);
        return;
    }
}
