import { Injectable } from '@nestjs/common';
import { PublicMangaServiceInterface } from './interfaces/publicMangaService';
import { PublicMangaRepository } from './publicManga.repository';
import { LangType } from 'src/common/types/lang';
import { MangaListItemDto, MangaListQuery } from './dto/mangaListItem/mangaListItem.dto';
import { MangaListItemStatisticDto } from './dto/mangaListItem/mangaListItemStatistic.dto';
import {
    MangaListItemLastUpdatedPagination,
    MangaListItemLastUpdatedQuery,
} from './dto/mangaListItem/mangaListItemLastUpdated.dto';
import { MangaListItemContinueReadDto } from './dto/mangaListItem/mangaListItemContinueRead.dto';

@Injectable()
export class PublicMangaService implements PublicMangaServiceInterface {
    constructor(private publicMangaRepository: PublicMangaRepository) {}

    async getMangaList(query: MangaListQuery, lang: LangType): Promise<MangaListItemDto[]> {
        return await this.publicMangaRepository.getMangaList(query, lang);
    }

    async getMangaQuickSearch(
        search: string,
        lang: LangType,
        userId: number | null,
    ): Promise<MangaListItemStatisticDto[]> {
        if (userId && search) {
            this.publicMangaRepository.saveUserLastSearchQueries(search, userId);
        }
        return await this.publicMangaRepository.getMangaQuickSearch(search, lang);
    }
    async getUserLastSearchQueries(userId: number): Promise<string[]> {
        return await this.publicMangaRepository.getUserLastSearchQueries(userId);
    }
    async deleteUserLastSearchQuery(search: string, userId: number): Promise<void> {
        await this.publicMangaRepository.deleteUserLastSearchQuery(search, userId);
    }
    async getLastUpdatedMangas(
        query: MangaListItemLastUpdatedQuery,
        userId?: number,
    ): Promise<MangaListItemLastUpdatedPagination> {
        return await this.publicMangaRepository.getLastUpdatedMangas(query, userId);
    }
    async getContinueReadManga(
        userId: number,
        lang: LangType,
    ): Promise<MangaListItemContinueReadDto[]> {
        return await this.publicMangaRepository.getContinueReadManga(userId, lang);
    }
    async dontShowContinueReadManga(userId: number, mangaId: number): Promise<void> {
        await this.publicMangaRepository.dontShowContinueReadManga(userId, mangaId);
    }
}
