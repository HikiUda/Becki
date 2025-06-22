import { CatalogMangaListDto } from '../dto/catalogManga.dto';
import { CatalogMangaQueryDto } from '../dto/catalogMangaQuery.dto';

export interface CatalogRepositoryInterface {
    getCatalogManga: (query: CatalogMangaQueryDto, userId?: number) => Promise<CatalogMangaListDto>;
}
