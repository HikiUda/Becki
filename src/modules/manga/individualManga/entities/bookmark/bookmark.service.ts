import { Injectable } from '@nestjs/common';
import { BookmarkServiceInterface } from './interfaces/bookmarkService';
import { BookmarkRepository } from './bookmark.repository';
import { UserMangaBookmarkDto } from './dto/userMangaBookmark.dto';
import { Bookmarks } from '@prisma/client';

@Injectable()
export class BookmarkService implements BookmarkServiceInterface {
    constructor(private bookmarkRepository: BookmarkRepository) {}
    async getUserMangaBookmark(mangaId: number, userId: number): Promise<UserMangaBookmarkDto> {
        return await this.bookmarkRepository.getUserMangaBookmark(mangaId, userId);
    }
    async setUserMangaBookmark(
        mangaId: number,
        userId: number,
        bookmark: Bookmarks,
    ): Promise<UserMangaBookmarkDto> {
        return await this.bookmarkRepository.setUserMangaBookmark(mangaId, userId, bookmark);
    }
    async deleteUserMangaBookmark(mangaId: number, userId: number): Promise<void> {
        return await this.bookmarkRepository.deleteUserMangaBookmark(mangaId, userId);
    }
}
