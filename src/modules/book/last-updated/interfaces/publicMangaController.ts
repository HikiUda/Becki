import { OptionalAuthUserRequest } from 'src/modules/user/auth';
import { LastUpdatedQuery } from '../dto/lastUpdatedQuery.dto';
import { LastUpdatedMangaList } from '../dto/lastUpdatedManga.dto';
import { LastUpdatedRanobeList } from '../dto/lastUpdatedRanobe.dto';

export interface LastUpdatedControllerInterface {
    getLastUpdatedManga: (
        req: OptionalAuthUserRequest,
        query: LastUpdatedQuery,
    ) => Promise<LastUpdatedMangaList>;
    getLastUpdatedRanobe: (
        req: OptionalAuthUserRequest,
        query: LastUpdatedQuery,
    ) => Promise<LastUpdatedRanobeList>;
}
