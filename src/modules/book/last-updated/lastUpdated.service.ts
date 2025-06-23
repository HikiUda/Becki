import { Injectable } from '@nestjs/common';
import { LastUpdatedRepository } from './lastUpdated.repository';
import { LastUpdatedQueryDto } from './dto/lastUpdatedQuery.dto';
import { LastUpdatedServiceInterface } from './interfaces/publicMangaService';
import { LastUpdatedMangaListDto } from './dto/lastUpdatedManga.dto';

@Injectable()
export class LastUpdatedService implements LastUpdatedServiceInterface {
    constructor(private repository: LastUpdatedRepository) {}

    async getLastUpdatedManga(
        query: LastUpdatedQueryDto,
        userId?: number,
    ): Promise<LastUpdatedMangaListDto> {
        return await this.repository.getLastUpdatedManga(query, userId);
    }
}
