import { Injectable } from '@nestjs/common';
import { BookBookmarksServiceInterface } from '../__common/interfaces/bookmarkService';
import { MangaBookmarksRepository } from './mangaBookmarks.repository';
import { UserId } from 'src/modules/user/auth';
import { MangaId } from '../../_common/model/bookId';
import { AddMangaBookmarkDto } from '../__common/dto/addBookBookmark.dto';
import { UserBookBookmark } from '../__common/dto/userBookBookmark.dto';

@Injectable()
export class MangaBookmarksService implements BookBookmarksServiceInterface {
    constructor(private repository: MangaBookmarksRepository) {}
    async getBookmark(bookId: MangaId, userId: UserId): Promise<UserBookBookmark> {
        return await this.repository.getBookmark(bookId, userId);
    }
    async setBookmark(bookId: MangaId, userId: UserId, data: AddMangaBookmarkDto): Promise<void> {
        await this.repository.setBookmark(bookId, userId, data);
        return;
    }
    async deleteBookmark(bookId: MangaId, userId: UserId): Promise<void> {
        await this.repository.deleteBookmark(bookId, userId);
        return;
    }
}
