import { CatalogMangaList } from '../dto/catalogManga.dto';
import { CatalogMangaQuery } from '../dto/catalogMangaQuery.dto';
import { CatalogRanobeList } from '../dto/catalogRanobe.dto';
import { CatalogRanobeQuery } from '../dto/catalogRanobeQuery.dto';

export interface CatalogRepositoryInterface {
    getCatalogManga: (query: CatalogMangaQuery, userId?: number) => Promise<CatalogMangaList>;
    getCatalogRanobe: (query: CatalogRanobeQuery, userId?: number) => Promise<CatalogRanobeList>;
}
