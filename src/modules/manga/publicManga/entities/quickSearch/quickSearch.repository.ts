import { Injectable } from '@nestjs/common';
import { QuickSearchRepositoryInterface } from '../../interfaces/quickSearch/quickSearchRepository';
import {
    getMangaQuickSearch,
    toMangaItemListStatisticDto,
} from '../../prisma/getMangaQuickSearch/getMangaQuickSearch';
import { LangType } from 'src/common/dto/langQuery.dto';
import { MangaListItemStatisticDto } from '../../dto/mangaListItem/mangaListItemStatistic.dto';
import { saveUserLastSearchQueries } from '../../prisma/userLastSearchQueries/saveUserLastSearchQueries';
import { getUserLastSearchQueries } from '../../prisma/userLastSearchQueries/getUserLastSearchQueries';
import { deleteUserLastSearchQuery } from '../../prisma/userLastSearchQueries/deleteUserLastSearchQuery';

@Injectable()
export class QuickSearchRepository implements QuickSearchRepositoryInterface {
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
}
