import { LangType } from 'src/common/dto/langQuery.dto';
import { MangaIdsType } from '../../common/types/mangaTypes';
import { MangaDto } from '../dto/manga.dto';
import { UserMangaBookmarkDto } from '../dto/userMangaBookmark.dto';
import { Bookmarks } from '@prisma/client';

export interface IndividualMangaRepositoryInterface {
    getManga: (id: MangaIdsType, lang: LangType) => Promise<MangaDto>;
    getUserMangaBookmark: (mangaId: number, userId: number) => Promise<UserMangaBookmarkDto>;
    setUserMangaBookmark: (
        mangaId: number,
        userId: number,
        bookmark: Bookmarks,
    ) => Promise<UserMangaBookmarkDto>;
    deleteUserMangaBookmark: (mangaId: number, userId: number) => Promise<void>;
}
