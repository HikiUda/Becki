import { LastUpdatedQuery } from '../dto/lastUpdatedQuery.dto';
import { LastUpdatedMangaList } from '../dto/lastUpdatedManga.dto';
import { LastUpdatedRanobeList } from '../dto/lastUpdatedRanobe.dto';
import { UserId } from 'src/modules/user/auth';

export interface LastUpdatedRepositoryInterface {
    getLastUpdatedManga: (
        query: LastUpdatedQuery,
        userId?: UserId,
    ) => Promise<LastUpdatedMangaList>;
    getLastUpdatedRanobe: (
        query: LastUpdatedQuery,
        userId?: UserId,
    ) => Promise<LastUpdatedRanobeList>;
}
