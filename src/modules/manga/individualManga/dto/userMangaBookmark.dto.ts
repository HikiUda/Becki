import { Bookmarks } from '@prisma/client';

export interface UserMangaBookmarkDto {
    mangaId: number;
    userId: number;
    bookmark: Bookmarks | null;
}
export interface SetUserMangaBookmarkDto {
    //TODO check reques body have bookmark
    bookmark: Bookmarks;
}
