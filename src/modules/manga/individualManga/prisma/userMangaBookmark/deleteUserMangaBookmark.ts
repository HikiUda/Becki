import { Prisma } from '@prisma/client';
import { prisma } from 'src/common/helpers/prisma';

export const deleteUserMangaBookmark = async (mangaId: number, userId: number) => {
    const id = `${mangaId}-${userId}`;
    return await prisma.userMangaBookmarks.delete({ where: { id } });
};

export type DeleteUserMangaBookmarkReturnType = Prisma.PromiseReturnType<
    typeof deleteUserMangaBookmark
>;
