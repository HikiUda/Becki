import { Injectable } from '@nestjs/common';
import { QuickSearchMangaRepository } from './quickSearchManga.repository';
import { QuickSearchServiceInterface } from '../__common/interfaces/quickSearchService';
import { QuickSearchMangaDto } from './dto/quickSearchManga';
import { QuickSearchQueryDto } from '../__common/dto/quickSearchQuery.dto';

@Injectable()
export class QuickSearchMangaService implements QuickSearchServiceInterface<QuickSearchMangaDto[]> {
    constructor(private repository: QuickSearchMangaRepository) {}

    async getBooks(
        query: QuickSearchQueryDto,
        userId: number | null,
    ): Promise<QuickSearchMangaDto[]> {
        const { search } = query;
        if (userId && search) {
            const queries = await this.repository.getUserLastQueries(userId);
            const handledQueries = [search].concat(queries.filter((q) => q !== search)).slice(0, 5);
            await this.repository.setUserLastQueries(handledQueries, userId);
        }

        return await this.repository.getBooks(query);
    }
    async getUserLastQueries(userId: number): Promise<string[]> {
        return await this.repository.getUserLastQueries(userId);
    }
    async deleteUserLastQuery(search: string, userId: number): Promise<void> {
        const queries = await this.repository.getUserLastQueries(userId);
        await this.repository.setUserLastQueries(
            queries.filter((query) => query !== search),
            userId,
        );
        return;
    }
}
