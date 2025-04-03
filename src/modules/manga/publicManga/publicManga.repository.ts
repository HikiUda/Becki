import { Injectable } from '@nestjs/common';
import { PublicMangaRepositoryInterface } from './interfaces/publicMangaRepository';
import { LangType } from 'src/common/types/lang';
import { MangaListItemDto, MangaListQuery } from './dto/mangaListItem/mangaListItem.dto';
import { getMangaList } from './prisma/getMangaList';
import { toMangaListItemDto } from './prisma/getMangaList/toMangaListItemDto';
import { MangaListItemStatisticDto } from './dto/mangaListItem/mangaListItemStatistic.dto';
import {
    getMangaQuickSearch,
    toMangaItemListStatisticDto,
} from './prisma/getMangaQuickSearch/getMangaQuickSearch';
import { saveUserLastSearchQueries } from './prisma/userLastSearchQueries/saveUserLastSearchQueries';
import { getUserLastSearchQueries } from './prisma/userLastSearchQueries/getUserLastSearchQueries';
import { deleteUserLastSearchQuery } from './prisma/userLastSearchQueries/deleteUserLastSearchQuery';
import {
    MangaListItemLastUpdatedQuery,
    MangaListItemLastUpdatedPagination,
} from './dto/mangaListItem/mangaListItemLastUpdated.dto';
import {
    getLastUpdatedMangas,
    toMangaListItemLastUpdatedDto,
} from './prisma/getLastUpdatedMangas/getLastUpdatedManga';
import { MangaListItemContinueReadDto } from './dto/mangaListItem/mangaListItemContinueRead.dto';
import {
    getContinueReadManga,
    toMangaListItemContinueReadDto,
} from './prisma/сontinueReadManga/getContinueReadManga';
import { dontShowContinueReadManga } from './prisma/сontinueReadManga/dontShowContinueReadManga';

@Injectable()
export class PublicMangaRepository implements PublicMangaRepositoryInterface {
    constructor() {}

    async getMangaList(query: MangaListQuery, lang: LangType): Promise<MangaListItemDto[]> {
        //TODO
        const mangaList = await getMangaList(query, lang);
        return toMangaListItemDto(mangaList, lang);
    }

    async getMangaQuickSearch(
        search: string,
        lang: LangType,
    ): Promise<MangaListItemStatisticDto[]> {
        const mangas = await getMangaQuickSearch(search);
        return toMangaItemListStatisticDto(mangas, lang);
    }
    async saveUserLastSearchQueries(search: string, userId: number): Promise<void> {
        await saveUserLastSearchQueries(search, userId);
    }
    async getUserLastSearchQueries(userId: number): Promise<string[]> {
        return await getUserLastSearchQueries(userId);
    }
    async deleteUserLastSearchQuery(search: string, userId: number): Promise<void> {
        await deleteUserLastSearchQuery(search, userId);
    }
    async getLastUpdatedMangas(
        query: MangaListItemLastUpdatedQuery,
        userId?: number,
    ): Promise<MangaListItemLastUpdatedPagination> {
        const data = await getLastUpdatedMangas(query, userId);
        const mangas = toMangaListItemLastUpdatedDto(data, query.lang);
        //TODO pagination
        return {
            data: mangas,
            prevPage: query.page - 1 > 0 ? query.page - 1 : null,
            nextPage: mangas.length === query.limit ? query.page + 1 : null,
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
