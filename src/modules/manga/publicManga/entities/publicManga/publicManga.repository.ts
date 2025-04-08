import { Injectable } from '@nestjs/common';
import { PublicMangaRepositoryInterface } from '../../interfaces/publicManga/publicMangaRepository';
import { MangaListItemPagination } from '../../dto/mangaListItem/mangaListItem.dto';
import { MangaListQueryDto } from '../../dto/publicManga/getMangaListQuery/getMangaListQuery.dto';
import { LangType } from 'src/common/dto/query/langQuery.dto';
import { getMangaList, getMangaListCount } from '../../prisma/getMangaList';
import { toMangaListItemDto } from '../../prisma/getMangaList/toMangaListItemDto';
import {
    getLastUpdatedMangas,
    toMangaListItemLastUpdatedDto,
} from '../../prisma/getLastUpdatedMangas/getLastUpdatedManga';
import { MangaListItemContinueReadDto } from '../../dto/mangaListItem/mangaListItemContinueRead.dto';
import {
    getContinueReadManga,
    toMangaListItemContinueReadDto,
} from '../../prisma/сontinueReadManga/getContinueReadManga';
import { dontShowContinueReadManga } from '../../prisma/сontinueReadManga/dontShowContinueReadManga';
import { getLastUpdatedMangasCount } from '../../prisma/getLastUpdatedMangas/getLastUpdatedMangasCount';
import { MangaListItemLastUpdatedPagination } from '../../dto/mangaListItem/mangaListItemLastUpdated.dto';
import { MangaListItemLastUpdatedQueryDto } from '../../dto/publicManga/lastUpdatedMangaQuery.dto';
import { getPagination } from 'src/common/helpers/pagination/getPagination';

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
    async getContinueReadManga(
        userId: number,
        lang: LangType,
    ): Promise<MangaListItemContinueReadDto[]> {
        const data = await getContinueReadManga(userId, lang);
        return await toMangaListItemContinueReadDto(data, lang);
    }
    async dontShowContinueReadManga(userId: number, mangaId: number): Promise<void> {
        await dontShowContinueReadManga(userId, mangaId);
    }
}
