import { Injectable } from '@nestjs/common';
import { PublicMangaRepositoryInterface } from '../../interfaces/publicManga/publicMangaRepository';
import { MangaListItemDto, MangaListQuery } from '../../dto/mangaListItem/mangaListItem.dto';
import { LangType } from 'src/common/dto/langQuery.dto';
import { getMangaList } from '../../prisma/getMangaList';
import { toMangaListItemDto } from '../../prisma/getMangaList/toMangaListItemDto';
import {
    MangaListItemLastUpdatedPagination,
    MangaListItemLastUpdatedQueryDto,
} from '../../dto/mangaListItem/mangaListItemLastUpdated.dto';
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
import { getLastUpdatedMangasPagination } from '../../prisma/getLastUpdatedMangas/getLastUpdatedMangasPagination';

@Injectable()
export class PublicMangaRepository implements PublicMangaRepositoryInterface {
    constructor() {}

    async getMangaList(query: MangaListQuery, lang: LangType): Promise<MangaListItemDto[]> {
        //TODO
        const mangaList = await getMangaList(query, lang);
        return toMangaListItemDto(mangaList, lang);
    }

    async getLastUpdatedMangas(
        query: MangaListItemLastUpdatedQueryDto,
        userId?: number,
    ): Promise<MangaListItemLastUpdatedPagination> {
        const { limit, page } = query;
        const data = await getLastUpdatedMangas(query, userId);
        const mangas = toMangaListItemLastUpdatedDto(data, query.lang);
        const pagination = await getLastUpdatedMangasPagination(query, userId);
        return {
            data: mangas,
            prevPage: page - 1 > 0 ? page - 1 : null,
            nextPage: pagination - limit * page > 0 ? page + 1 : null,
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
