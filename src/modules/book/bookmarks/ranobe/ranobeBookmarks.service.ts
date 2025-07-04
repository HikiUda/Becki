import { Injectable } from '@nestjs/common';
import { BookBookmarksServiceInterface } from '../__common/interfaces/bookmarkService';
import { RanobeBookmarksRepository } from './ranobeBookmarks.repository';
import { UserId } from 'src/modules/user/auth';
import { RanobeId } from '../../_common/model/bookId';
import { AddRanobeBookmarkDto } from '../__common/dto/addBookBookmark.dto';
import { UserBookBookmark } from '../__common/dto/userBookBookmark.dto';

@Injectable()
export class RanobeBookmarksService implements BookBookmarksServiceInterface {
    constructor(private repository: RanobeBookmarksRepository) {}
    async getBookmark(bookId: RanobeId, userId: UserId): Promise<UserBookBookmark> {
        return await this.repository.getBookmark(bookId, userId);
    }
    async setBookmark(bookId: RanobeId, userId: UserId, data: AddRanobeBookmarkDto): Promise<void> {
        await this.repository.setBookmark(bookId, userId, data);
        return;
    }
    async deleteBookmark(bookId: RanobeId, userId: UserId): Promise<void> {
        await this.repository.deleteBookmark(bookId, userId);
        return;
    }
}
