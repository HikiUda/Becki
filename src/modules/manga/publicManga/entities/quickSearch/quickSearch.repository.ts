import { Injectable } from '@nestjs/common';
import { QuickSearchRepositoryInterface } from './interfaces/quickSearchRepository';
import { getMangaQuickSearch } from './prisma/getMangaQuickSearch';
import { LangType } from 'src/shared/dto/query/langQuery.dto';
import { MangaListItemStatisticDto } from '../../dto/mangaListItemStatistic.dto';
import { saveUserLastSearchQueries } from './prisma/userLastSearchQueries/saveUserLastSearchQueries';
import { getUserLastSearchQueries } from './prisma/userLastSearchQueries/getUserLastSearchQueries';
import { deleteUserLastSearchQuery } from './prisma/userLastSearchQueries/deleteUserLastSearchQuery';
import { toMangaListStatisticDto } from '../../prisma/getMangaListStatistic';

@Injectable()
export class QuickSearchRepository implements QuickSearchRepositoryInterface {
    async getMangaQuickSearch(
        search: string,
        lang: LangType,
    ): Promise<MangaListItemStatisticDto[]> {
        const mangas = await getMangaQuickSearch(search);
        return toMangaListStatisticDto(mangas, lang);
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
}
