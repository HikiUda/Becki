import { Injectable } from '@nestjs/common';
import { QuickSearchRepository } from './quickSearch.repository';
import { QuickSearchServiceInterface } from './interfaces/quickSearchService';
import { LangType } from 'src/shared/dto/query/langQuery.dto';
import { MangaListItemStatisticDto } from '../../dto/mangaListItemStatistic.dto';

@Injectable()
export class QuickSearchService implements QuickSearchServiceInterface {
    constructor(private quickSearchRepository: QuickSearchRepository) {}
    async getMangaQuickSearch(
        search: string,
        lang: LangType,
        userId: number | null,
    ): Promise<MangaListItemStatisticDto[]> {
        if (userId && search) {
            this.quickSearchRepository.saveUserLastSearchQueries(search, userId);
        }
        return await this.quickSearchRepository.getMangaQuickSearch(search, lang);
    }
    async getUserLastSearchQueries(userId: number): Promise<string[]> {
        return await this.quickSearchRepository.getUserLastSearchQueries(userId);
    }
    async deleteUserLastSearchQuery(search: string, userId: number): Promise<void> {
        await this.quickSearchRepository.deleteUserLastSearchQuery(search, userId);
    }
}
