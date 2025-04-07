import { Prisma } from '@prisma/client';
import { prisma } from 'src/common/helpers/prisma';
import { UserMangaBookmarkDto } from '../../dto/userMangaBookmark.dto';

export const getUserMangaBookmark = async (mangaId: number, userId: number) => {
    const id = `${mangaId}-${userId}`;
    return await prisma.userMangaBookmarks.findUnique({ where: { id } });
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
