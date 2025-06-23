import { OptionalAuthUserRequest } from 'src/modules/user/auth';
import { LastUpdatedQueryDto } from '../dto/lastUpdatedQuery.dto';
import { LastUpdatedMangaListDto } from '../dto/lastUpdatedManga.dto';

export interface LastUpdatedControllerInterface {
    getLastUpdatedManga: (
        req: OptionalAuthUserRequest,
        query: LastUpdatedQueryDto,
    ) => Promise<LastUpdatedMangaListDto>;
}
