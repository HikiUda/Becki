import { Injectable, NotFoundException } from '@nestjs/common';
import { IndividualMangaRepositoryInterface } from './interfaces/individualMangaRepository';
import { MangaDto } from './dto/manga.dto';
import { MangaIdsType } from '../common/types/mangaTypes';
import { LangType } from 'src/common/dto/query/langQuery.dto';
import { getManga, toMangaDto } from './prisma/getManga';
import { Bookmarks } from '@prisma/client';
import { UserMangaBookmarkDto } from './dto/userMangaBookmark.dto';
import {
    getUserMangaBookmark,
    toUserMangaBookmarkDto,
} from './prisma/userMangaBookmark/getUserMangaBookmark';
import { setUserMangaBookmark } from './prisma/userMangaBookmark/setUserMangaBookmark';
import { deleteUserMangaBookmark } from './prisma/userMangaBookmark/deleteUserMangaBookmark';

@Injectable()
export class IndividualMangaRepository implements IndividualMangaRepositoryInterface {
    constructor() {}

    async getManga(mangaId: MangaIdsType, lang: LangType, userId?: number): Promise<MangaDto> {
        const manga = await getManga(mangaId, lang, userId);
        const dto = await toMangaDto(manga, lang);
        if (!dto) throw new NotFoundException('Тайтл не найден.');
        return dto;
    }
    async getUserMangaBookmark(mangaId: number, userId: number): Promise<UserMangaBookmarkDto> {
        const userBookmark = await getUserMangaBookmark(mangaId, userId);
        return toUserMangaBookmarkDto(userBookmark, mangaId, userId);
    }
    async setUserMangaBookmark(
        mangaId: number,
        userId: number,
        bookmark: Bookmarks,
    ): Promise<UserMangaBookmarkDto> {
        const userBookmark = await setUserMangaBookmark(mangaId, userId, bookmark);
        return toUserMangaBookmarkDto(userBookmark, mangaId, userId);
    }
    async deleteUserMangaBookmark(mangaId: number, userId: number): Promise<void> {
        await deleteUserMangaBookmark(mangaId, userId);
    }
}
