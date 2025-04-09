import { Bookmarks, Prisma } from '@prisma/client';
import { prisma } from 'src/common/helpers/prisma';
import { getUserMangaBookmarkId } from '../helpers/getUserMangaBookmarkId';

export const setUserMangaBookmark = async (
    mangaId: number,
    userId: number,
    bookmark: Bookmarks,
) => {
    const id = getUserMangaBookmarkId(mangaId, userId);
    return await prisma.userMangaBookmarks.upsert({
        where: { id },
        create: { id, mangaId, userId, bookmark },
        update: { bookmark },
    });
};

export type SetUserMangaBookmarkReturnType = Prisma.PromiseReturnType<typeof setUserMangaBookmark>;
