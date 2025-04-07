import { Injectable } from '@nestjs/common';
import { PublicMangaRepository } from './publicManga.repository';
import { PublicMangaServiceInterface } from '../../interfaces/publicManga/publicMangaService';
import { MangaListItemDto, MangaListQuery } from '../../dto/mangaListItem/mangaListItem.dto';
import { LangType } from 'src/common/dto/langQuery.dto';
import {
    MangaListItemLastUpdatedPagination,
    MangaListItemLastUpdatedQueryDto,
} from '../../dto/mangaListItem/mangaListItemLastUpdated.dto';
import { MangaListItemContinueReadDto } from '../../dto/mangaListItem/mangaListItemContinueRead.dto';

@Injectable()
export class PublicMangaService implements PublicMangaServiceInterface {
    constructor(private publicMangaRepository: PublicMangaRepository) {}

    async getMangaList(query: MangaListQuery, lang: LangType): Promise<MangaListItemDto[]> {
        return await this.publicMangaRepository.getMangaList(query, lang);
    }

    async getLastUpdatedMangas(
        query: MangaListItemLastUpdatedQueryDto,
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
