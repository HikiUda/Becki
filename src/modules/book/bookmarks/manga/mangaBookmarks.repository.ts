import { Injectable } from '@nestjs/common';
import { BookBookmarksRepositoryInterface } from '../__common/interfaces/bookmarkRepository';
import { PrismaService } from 'src/shared/prisma/prisma.service';
import { UserId } from 'src/modules/user/auth';
import { MangaId } from '../../_common/model/bookId';
import { AddMangaBookmarkDto } from '../__common/dto/addBookBookmark.dto';
import { UserBookBookmark } from '../__common/dto/userBookBookmark.dto';
import { getBookBookmarksId } from '../__common/getBookBookmarksId';

@Injectable()
export class MangaBookmarksRepository implements BookBookmarksRepositoryInterface {
    constructor(private prisma: PrismaService) {}

    async getBookmark(bookId: MangaId, userId: UserId): Promise<UserBookBookmark> {
        const data = await this.prisma.mangaBookmarks.findUnique({
            where: { id: getBookBookmarksId(userId, bookId) },
            select: { bookmark: true },
        });

        return {
            userId,
            bookId,
            bookmark: data?.bookmark || null,
        };
    }

    async setBookmark(bookId: MangaId, userId: UserId, data: AddMangaBookmarkDto): Promise<void> {
        const bookBookmarkId = getBookBookmarksId(userId, bookId);
        const show = data.bookmark === 'Reading' || data.bookmark === 'Planned';
        await this.prisma.mangaBookmarks.upsert({
            where: { id: bookBookmarkId },
            create: { id: bookBookmarkId, bookId, userId, ...data, show },
            update: { bookmark: data.bookmark, show },
        });
        return;
    }

    async deleteBookmark(bookId: MangaId, userId: UserId): Promise<void> {
        await this.prisma.mangaBookmarks.delete({
            where: { id: getBookBookmarksId(userId, bookId) },
        });
        return;
    }
}
