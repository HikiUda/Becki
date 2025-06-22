import { OptionalAuthUserRequest } from 'src/modules/user/auth';
import { CatalogMangaListDto } from '../dto/catalogManga.dto';
import { CatalogMangaQueryDto } from '../dto/catalogMangaQuery.dto';

export interface CatalogControllerInterface {
    getCatalogManga: (
        req: OptionalAuthUserRequest,
        query: CatalogMangaQueryDto,
    ) => Promise<CatalogMangaListDto>;
}
