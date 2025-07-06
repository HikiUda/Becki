import { Injectable } from '@nestjs/common';
import { UserBookChapterActionsServiceInterface } from '../__common/interfaces/userBookChapterActionsService';
import { UserRanobeChapterActionsRepository } from './userRanobeChapterActions.repository';
import { UserId } from 'src/modules/user/auth';
import { RanobeChapterParams } from '../../_common/model/bookId';
import { UserLikeBookChapterDto } from '../__common/dto/userLikeBookChapter.dto';

@Injectable()
export class UserRanobeChapterActionsService implements UserBookChapterActionsServiceInterface {
    constructor(private repository: UserRanobeChapterActionsRepository) {}
    async addUserViewChapter(params: RanobeChapterParams, userId: UserId): Promise<void> {
        await this.repository.addUserViewChapter(params, userId);
        return;
    }
    async getUserLikeChapter(
        params: RanobeChapterParams,
        userId?: UserId,
    ): Promise<UserLikeBookChapterDto> {
        return await this.repository.getUserLikeChapter(params, userId);
    }
    async setUserLikeChapter(params: RanobeChapterParams, userId: UserId): Promise<void> {
        await this.repository.setUserLikeChapter(params, userId);
        return;
    }
}
