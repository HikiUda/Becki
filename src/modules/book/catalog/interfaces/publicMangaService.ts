import { CatalogMangaListDto } from '../dto/catalogManga.dto';
import { CatalogMangaQueryDto } from '../dto/catalogMangaQuery.dto';

export interface CatalogServiceInterface {
    getCatalogManga: (query: CatalogMangaQueryDto, userId?: number) => Promise<CatalogMangaListDto>;
}
