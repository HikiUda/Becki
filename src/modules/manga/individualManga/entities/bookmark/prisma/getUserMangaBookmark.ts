import { Prisma } from '@prisma/client';
import { prisma } from 'src/shared/prisma/prisma';
import { UserMangaBookmarkDto } from '../dto/userMangaBookmark.dto';
import { getUserMangaBookmarkId } from '../helpers/getUserMangaBookmarkId';

export const getUserMangaBookmark = async (mangaId: number, userId: number) => {
    return await prisma.userMangaBookmarks.findUnique({
        where: { id: getUserMangaBookmarkId(mangaId, userId) },
    });
};

export type GetUserMangaBookmarkReturnType = Prisma.PromiseReturnType<typeof getUserMangaBookmark>;

export function toUserMangaBookmarkDto(
    data: GetUserMangaBookmarkReturnType,
    mangaId: number,
    userId: number,
): UserMangaBookmarkDto {
    return {
        mangaId: mangaId,
        userId: userId,
        bookmark: data?.bookmark || null,
    };
}
