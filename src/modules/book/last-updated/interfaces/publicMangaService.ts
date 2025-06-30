import { LastUpdatedMangaList } from '../dto/lastUpdatedManga.dto';
import { LastUpdatedQuery } from '../dto/lastUpdatedQuery.dto';
import { LastUpdatedRanobeList } from '../dto/lastUpdatedRanobe.dto';

export interface LastUpdatedServiceInterface {
    getLastUpdatedManga: (
        query: LastUpdatedQuery,
        userId?: number,
    ) => Promise<LastUpdatedMangaList>;
    getLastUpdatedRanobe: (
        query: LastUpdatedQuery,
        userId?: number,
    ) => Promise<LastUpdatedRanobeList>;
}
