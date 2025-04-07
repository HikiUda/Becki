import { Bookmarks, Prisma } from '@prisma/client';
import { prisma } from 'src/common/helpers/prisma';

export const setUserMangaBookmark = async (
    mangaId: number,
    userId: number,
    bookmark: Bookmarks,
) => {
    //TODO reuse function for get userMangaBookmark id
    const id = `${mangaId}-${userId}`;
    return await prisma.userMangaBookmarks.upsert({
        where: { id },
        create: { id, mangaId, userId, bookmark },
        update: { bookmark },
    });
};

export type SetUserMangaBookmarkReturnType = Prisma.PromiseReturnType<typeof setUserMangaBookmark>;
