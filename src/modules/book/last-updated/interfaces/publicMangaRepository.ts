import { LastUpdatedQueryDto } from '../dto/lastUpdatedQuery.dto';
import { LastUpdatedMangaListDto } from '../dto/lastUpdatedManga.dto';

export interface LastUpdatedRepositoryInterface {
    getLastUpdatedManga: (
        query: LastUpdatedQueryDto,
        userId?: number,
    ) => Promise<LastUpdatedMangaListDto>;
}
