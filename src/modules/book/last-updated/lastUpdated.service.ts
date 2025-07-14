import { Injectable } from '@nestjs/common';
import { LastUpdatedRepository } from './lastUpdated.repository';
import { LastUpdatedQuery } from './dto/lastUpdatedQuery.dto';
import { LastUpdatedServiceInterface } from './interfaces/publicMangaService';
import { LastUpdatedMangaList } from './dto/lastUpdatedManga.dto';
import { LastUpdatedRanobeList } from './dto/lastUpdatedRanobe.dto';
import { UserId } from 'src/modules/authorization';

@Injectable()
export class LastUpdatedService implements LastUpdatedServiceInterface {
    constructor(private repository: LastUpdatedRepository) {}

    async getLastUpdatedManga(
        query: LastUpdatedQuery,
        userId?: UserId,
    ): Promise<LastUpdatedMangaList> {
        return await this.repository.getLastUpdatedManga(query, userId);
    }

    async getLastUpdatedRanobe(
        query: LastUpdatedQuery,
        userId?: UserId,
    ): Promise<LastUpdatedRanobeList> {
        return await this.repository.getLastUpdatedRanobe(query, userId);
    }
}
