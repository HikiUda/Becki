import { LastUpdatedMangaListDto } from '../dto/lastUpdatedManga.dto';
import { LastUpdatedQueryDto } from '../dto/lastUpdatedQuery.dto';

export interface LastUpdatedServiceInterface {
    getLastUpdatedManga: (
        query: LastUpdatedQueryDto,
        userId?: number,
    ) => Promise<LastUpdatedMangaListDto>;
}
