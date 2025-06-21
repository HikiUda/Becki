import { Injectable } from '@nestjs/common';
import { PublicMangaRepositoryInterface } from './interfaces/publicMangaRepository';
import { MangaListItemPagination } from '../../dto/mangaListItem.dto';
import { MangaListQueryDto } from './dto/getMangaListQuery/getMangaListQuery.dto';
import { getMangaList, getMangaListCount } from './prisma/getMangaList';
import { toMangaListItemDto } from './prisma/getMangaList/toMangaListItemDto';
import {
    getLastUpdatedMangas,
    toMangaListItemLastUpdatedDto,
} from './prisma/getLastUpdatedMangas/getLastUpdatedManga';
import { getLastUpdatedMangasCount } from './prisma/getLastUpdatedMangas/getLastUpdatedMangasCount';
import { MangaListItemLastUpdatedPagination } from '../../dto/mangaListItemLastUpdated.dto';
import { MangaListItemLastUpdatedQueryDto } from './dto/lastUpdatedMangaQuery.dto';
import { getPagination } from 'src/shared/helpers/pagination/getPagination';
import { LangType } from 'src/shared/dto/query/langQuery.dto';
import { MangaListItemStatisticResponseArrayData } from '../../dto/mangaListItemStatistic.dto';
import { getRelatedManga } from './prisma/getRelatedManga/getRelatedManga';
import { toMangaListStatisticDto } from '../../prisma/getMangaListStatistic';

@Injectable()
export class PublicMangaRepository implements PublicMangaRepositoryInterface {
    constructor() {}

    async getMangaList(
        query: MangaListQueryDto,
        userId?: number,
    ): Promise<MangaListItemPagination> {
        const mangaList = await getMangaList(query, userId);
        const data = toMangaListItemDto(mangaList, query.lang);
        const mangaCount = await getMangaListCount(query);

        return {
            data,
            ...getPagination(mangaCount, query.page, query.limit),
        };
    }

    async getLastUpdatedMangas(
        query: MangaListItemLastUpdatedQueryDto,
        userId?: number,
    ): Promise<MangaListItemLastUpdatedPagination> {
        const data = await getLastUpdatedMangas(query, userId);
        const manga = toMangaListItemLastUpdatedDto(data, query.lang);
        const mangaCount = await getLastUpdatedMangasCount(query, userId);
        return {
            data: manga,
            ...getPagination(mangaCount, query.page, query.limit),
        };
    }
    async getRelatedManga(
        mangaId: number,
        lang: LangType,
    ): Promise<MangaListItemStatisticResponseArrayData> {
        const data = await getRelatedManga(mangaId);
        const manga = toMangaListStatisticDto(data, lang);
        return { data: manga };
    }
}
