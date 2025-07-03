import { Injectable } from '@nestjs/common';
import { QuickSearchRanobeRepository } from './quickSearchRanobe.repository';
import { QuickSearchServiceInterface } from '../__common/interfaces/quickSearchService';
import { QuickSearchRanobeList } from './dto/quickSearchRanobe.dto';
import { QuickSearchQuery } from '../__common/dto/quickSearchQuery.dto';
import { QuickSearchLastList } from '../__common/dto/quickSearchLastList.dto';
import { UserId } from 'src/modules/user/auth';

@Injectable()
export class QuickSearchRanobeService implements QuickSearchServiceInterface {
    constructor(private repository: QuickSearchRanobeRepository) {}

    async getBooks(query: QuickSearchQuery, userId: UserId | null): Promise<QuickSearchRanobeList> {
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
