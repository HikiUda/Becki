import { Injectable } from '@nestjs/common';
import { BookmarkRepositoryInterface } from './interfaces/bookmarkRepository';
import { PrismaService } from 'src/common/services/prisma.service';
import { UserMangaBookmarkDto } from './dto/userMangaBookmark.dto';
import { Bookmarks } from '@prisma/client';
import { deleteUserMangaBookmark } from './prisma/deleteUserMangaBookmark';
import { setUserMangaBookmark } from './prisma/setUserMangaBookmark';
import { getUserMangaBookmark, toUserMangaBookmarkDto } from './prisma/getUserMangaBookmark';

@Injectable()
export class BookmarkRepository implements BookmarkRepositoryInterface {
    constructor(private prisma: PrismaService) {}
    async getUserMangaBookmark(mangaId: number, userId: number): Promise<UserMangaBookmarkDto> {
        const userBookmark = await getUserMangaBookmark(mangaId, userId);
        return toUserMangaBookmarkDto(userBookmark, mangaId, userId);
    }
    async setUserMangaBookmark(
        mangaId: number,
        userId: number,
        bookmark: Bookmarks,
    ): Promise<UserMangaBookmarkDto> {
        const userBookmark = await setUserMangaBookmark(mangaId, userId, bookmark);
        return toUserMangaBookmarkDto(userBookmark, mangaId, userId);
    }
    async deleteUserMangaBookmark(mangaId: number, userId: number): Promise<void> {
        await deleteUserMangaBookmark(mangaId, userId);
    }
}
