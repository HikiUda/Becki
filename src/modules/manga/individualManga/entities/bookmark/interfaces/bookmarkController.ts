import { AuthUserRequest } from 'src/modules/user/auth';
import { UserMangaBookmarkDto } from '../dto/userMangaBookmark.dto';
import { BookmarkDto } from 'src/shared/dto/manga/bookmarks.dto';

export interface BookmarkControllerInterface {
    getUserMangaBookmark: (mangaId: number, req: AuthUserRequest) => Promise<UserMangaBookmarkDto>;
    setUserMangaBookmark: (
        mangaId: number,
        req: AuthUserRequest,
        body: BookmarkDto,
    ) => Promise<UserMangaBookmarkDto>;
    deleteUserMangaBookmark: (mangaId: number, req: AuthUserRequest) => Promise<void>;
}
