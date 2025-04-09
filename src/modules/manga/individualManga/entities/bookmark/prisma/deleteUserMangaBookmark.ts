import { Prisma } from '@prisma/client';
import { prisma } from 'src/common/helpers/prisma';
import { getUserMangaBookmarkId } from '../helpers/getUserMangaBookmarkId';

export const deleteUserMangaBookmark = async (mangaId: number, userId: number) => {
    return await prisma.userMangaBookmarks.delete({
        where: { id: getUserMangaBookmarkId(mangaId, userId) },
    });
};

export type DeleteUserMangaBookmarkReturnType = Prisma.PromiseReturnType<
    typeof deleteUserMangaBookmark
>;
