import { LastUpdatedQuery } from '../dto/lastUpdatedQuery.dto';
import { LastUpdatedMangaList } from '../dto/lastUpdatedManga.dto';
import { LastUpdatedRanobeList } from '../dto/lastUpdatedRanobe.dto';

export interface LastUpdatedRepositoryInterface {
    getLastUpdatedManga: (
        query: LastUpdatedQuery,
        userId?: number,
    ) => Promise<LastUpdatedMangaList>;
    getLastUpdatedRanobe: (
        query: LastUpdatedQuery,
        userId?: number,
    ) => Promise<LastUpdatedRanobeList>;
}
