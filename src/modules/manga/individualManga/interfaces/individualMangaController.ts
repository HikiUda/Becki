import { LangType } from 'src/common/dto/langQuery.dto';
import { MangaIdsType } from '../../common/types/mangaTypes';
import { MangaDto } from '../dto/manga.dto';
import { SetUserMangaBookmarkDto, UserMangaBookmarkDto } from '../dto/userMangaBookmark.dto';
import { AuthUserRequest } from 'src/modules/user/auth/types/user';

export interface IndividualMangaControllerInterface {
    getManga: (id: MangaIdsType, lang: LangType) => Promise<MangaDto>;
    getUserMangaBookmark: (mangaId: number, req: AuthUserRequest) => Promise<UserMangaBookmarkDto>;
    setUserMangaBookmark: (
        mangaId: number,
        req: AuthUserRequest,
        body: SetUserMangaBookmarkDto,
    ) => Promise<UserMangaBookmarkDto>;
    deleteUserMangaBookmark: (mangaId: number, req: AuthUserRequest) => Promise<void>;
}
