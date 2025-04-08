import { LangQueryDto } from 'src/common/dto/query/langQuery.dto';
import { MangaIdsType } from '../../common/types/mangaTypes';
import { MangaDto } from '../dto/manga.dto';
import { SetUserMangaBookmarkDto, UserMangaBookmarkDto } from '../dto/userMangaBookmark.dto';
import { AuthUserRequest, OptionalAuthUserRequest } from 'src/modules/user/auth/types/user';

export interface IndividualMangaControllerInterface {
    getManga: (
        req: OptionalAuthUserRequest,
        id: MangaIdsType,
        query: LangQueryDto,
    ) => Promise<MangaDto>;
    getUserMangaBookmark: (mangaId: number, req: AuthUserRequest) => Promise<UserMangaBookmarkDto>;
    setUserMangaBookmark: (
        mangaId: number,
        req: AuthUserRequest,
        body: SetUserMangaBookmarkDto,
    ) => Promise<UserMangaBookmarkDto>;
    deleteUserMangaBookmark: (mangaId: number, req: AuthUserRequest) => Promise<void>;
}
