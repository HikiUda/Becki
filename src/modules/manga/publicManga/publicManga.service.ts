import { Injectable } from '@nestjs/common';
import { PublicMangaServiceInterface } from './interfaces/publicMangaService';
import { PublicMangaRepository } from './publicManga.repository';
import { MangaDto } from './dto/manga.dto';
import { LangType } from 'src/common/types/lang';
import { MangaIdsType } from '../common/types/mangaTypes';
import { MangaListItemDto, MangaListQuery } from './dto/mangaListItem/mangaListItem.dto';
import { MangaListItemStatisticDto } from './dto/mangaListItem/mangaListItemStatistic.dto';
import {
    MangaListItemLastUpdatedPagination,
    MangaListItemLastUpdatedQuery,
} from './dto/mangaListItem/mangaListItemLastUpdated.dto';

@Injectable()
export class PublicMangaService implements PublicMangaServiceInterface {
    constructor(private publicMangaRepository: PublicMangaRepository) {}

    async getMangaList(query: MangaListQuery, lang: LangType): Promise<MangaListItemDto[]> {
        return await this.publicMangaRepository.getMangaList(query, lang);
    }
    async getManga(id: MangaIdsType, lang: LangType): Promise<MangaDto> {
        //TODO add bookmark

        const manga = await this.publicMangaRepository.getManga(id, lang);
        return manga;
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
}
