import { Injectable } from '@nestjs/common';
import { IndividualMangaServiceInterface } from './interfaces/individualMangaService';
import { IndividualMangaRepository } from './individualManga.repository';
import { LangType } from 'src/common/dto/langQuery.dto';
import { MangaDto } from './dto/manga.dto';
import { MangaIdsType } from '../common/types/mangaTypes';
import { UserMangaBookmarkDto } from './dto/userMangaBookmark.dto';
import { Bookmarks } from '@prisma/client';

@Injectable()
export class IndividualMangaService implements IndividualMangaServiceInterface {
    constructor(private individualMangaRepository: IndividualMangaRepository) {}
    async getManga(id: MangaIdsType, lang: LangType): Promise<MangaDto> {
        //TODO add bookmark

        const manga = await this.individualMangaRepository.getManga(id, lang);
        return manga;
    }
    async getUserMangaBookmark(mangaId: number, userId: number): Promise<UserMangaBookmarkDto> {
        return await this.individualMangaRepository.getUserMangaBookmark(mangaId, userId);
    }
    async setUserMangaBookmark(
        mangaId: number,
        userId: number,
        bookmark: Bookmarks,
    ): Promise<UserMangaBookmarkDto> {
        return await this.individualMangaRepository.setUserMangaBookmark(mangaId, userId, bookmark);
    }
    async deleteUserMangaBookmark(mangaId: number, userId: number): Promise<void> {
        return await this.individualMangaRepository.deleteUserMangaBookmark(mangaId, userId);
    }
}
