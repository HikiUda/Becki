import { Injectable } from '@nestjs/common';
import { QuickSearchMangaRepository } from './quickSearchManga.repository';
import { QuickSearchServiceInterface } from '../__common/interfaces/quickSearchService';
import { QuickSearchMangaList } from './dto/quickSearchManga.dto';
import { QuickSearchQuery } from '../__common/dto/quickSearchQuery.dto';
import { QuickSearchLastList } from '../__common/dto/quickSearchLastList.dto';
import { UserId } from 'src/modules/user/auth';

@Injectable()
export class QuickSearchMangaService implements QuickSearchServiceInterface {
    constructor(private repository: QuickSearchMangaRepository) {}

    async getBooks(query: QuickSearchQuery, userId: UserId | null): Promise<QuickSearchMangaList> {
        const { search } = query;
        if (userId && search) {
            const queries = await this.repository.getUserLastQueries(userId);
            const handledQueries = [search].concat(queries.filter((q) => q !== search)).slice(0, 5);
            await this.repository.setUserLastQueries(handledQueries, userId);
        }

        const data = await this.repository.getBooks(query);
        return { data };
    }

    async getUserLastQueries(userId: UserId): Promise<QuickSearchLastList> {
        const data = await this.repository.getUserLastQueries(userId);
        return { data };
    }
    async deleteUserLastQuery(search: string, userId: UserId): Promise<void> {
        const queries = await this.repository.getUserLastQueries(userId);
        await this.repository.setUserLastQueries(
            queries.filter((query) => query !== search),
            userId,
        );
        return;
    }
}
