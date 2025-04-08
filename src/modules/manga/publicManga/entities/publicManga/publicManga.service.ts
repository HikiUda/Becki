import { Injectable } from '@nestjs/common';
import { PublicMangaRepository } from './publicManga.repository';
import { PublicMangaServiceInterface } from '../../interfaces/publicManga/publicMangaService';
import { MangaListItemPagination } from '../../dto/mangaListItem/mangaListItem.dto';
import { MangaListQueryDto } from '../../dto/publicManga/getMangaListQuery/getMangaListQuery.dto';
import { LangType } from 'src/common/dto/query/langQuery.dto';
import { MangaListItemLastUpdatedPagination } from '../../dto/mangaListItem/mangaListItemLastUpdated.dto';
import { MangaListItemLastUpdatedQueryDto } from '../../dto/publicManga/lastUpdatedMangaQuery.dto';
import { MangaListItemContinueReadDto } from '../../dto/mangaListItem/mangaListItemContinueRead.dto';

@Injectable()
export class PublicMangaService implements PublicMangaServiceInterface {
    constructor(private publicMangaRepository: PublicMangaRepository) {}

    async getMangaList(
        query: MangaListQueryDto,
        userId?: number,
    ): Promise<MangaListItemPagination> {
        return await this.publicMangaRepository.getMangaList(query, userId);
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
