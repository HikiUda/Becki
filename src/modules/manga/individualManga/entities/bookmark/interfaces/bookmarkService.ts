import { Bookmarks } from '@prisma/client';
import { UserMangaBookmarkDto } from '../dto/userMangaBookmark.dto';

export interface BookmarkServiceInterface {
    getUserMangaBookmark: (mangaId: number, userId: number) => Promise<UserMangaBookmarkDto>;
    setUserMangaBookmark: (
        mangaId: number,
        userId: number,
        bookmark: Bookmarks,
    ) => Promise<UserMangaBookmarkDto>;
    deleteUserMangaBookmark: (mangaId: number, userId: number) => Promise<void>;
}
