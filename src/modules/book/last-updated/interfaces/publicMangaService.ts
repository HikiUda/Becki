import { UserId } from 'src/modules/user/auth';
import { LastUpdatedMangaList } from '../dto/lastUpdatedManga.dto';
import { LastUpdatedQuery } from '../dto/lastUpdatedQuery.dto';
import { LastUpdatedRanobeList } from '../dto/lastUpdatedRanobe.dto';

export interface LastUpdatedServiceInterface {
    getLastUpdatedManga: (
        query: LastUpdatedQuery,
        userId?: UserId,
    ) => Promise<LastUpdatedMangaList>;
    getLastUpdatedRanobe: (
        query: LastUpdatedQuery,
        userId?: UserId,
    ) => Promise<LastUpdatedRanobeList>;
}
