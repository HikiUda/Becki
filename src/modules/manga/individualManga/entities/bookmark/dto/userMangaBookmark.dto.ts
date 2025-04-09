import { Bookmarks } from '@prisma/client';

export interface UserMangaBookmarkDto {
    mangaId: number;
    userId: number;
    bookmark: Bookmarks | null;
}
