import { OptionalAuthUserRequest } from 'src/modules/user/auth';
import { CatalogMangaList } from '../dto/catalogManga.dto';
import { CatalogMangaQuery } from '../dto/catalogMangaQuery.dto';
import { CatalogRanobeList } from '../dto/catalogRanobe.dto';
import { CatalogRanobeQuery } from '../dto/catalogRanobeQuery.dto';

export interface CatalogControllerInterface {
    getCatalogManga: (
        req: OptionalAuthUserRequest,
        query: CatalogMangaQuery,
    ) => Promise<CatalogMangaList>;
    getCatalogRanobe: (
        req: OptionalAuthUserRequest,
        query: CatalogRanobeQuery,
    ) => Promise<CatalogRanobeList>;
}
