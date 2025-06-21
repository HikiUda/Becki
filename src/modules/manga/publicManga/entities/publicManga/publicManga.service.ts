import { Injectable } from '@nestjs/common';
import { PublicMangaRepository } from './publicManga.repository';
import { PublicMangaServiceInterface } from './interfaces/publicMangaService';
import { MangaListItemPagination } from '../../dto/mangaListItem.dto';
import { MangaListQueryDto } from './dto/getMangaListQuery/getMangaListQuery.dto';
import { MangaListItemLastUpdatedPagination } from '../../dto/mangaListItemLastUpdated.dto';
import { MangaListItemLastUpdatedQueryDto } from './dto/lastUpdatedMangaQuery.dto';
import { LangType } from 'src/shared/dto/query/langQuery.dto';
import { MangaListItemStatisticResponseArrayData } from '../../dto/mangaListItemStatistic.dto';

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
    async getRelatedManga(
        mangaId: number,
        lang: LangType,
    ): Promise<MangaListItemStatisticResponseArrayData> {
        return await this.publicMangaRepository.getRelatedManga(mangaId, lang);
    }
}
