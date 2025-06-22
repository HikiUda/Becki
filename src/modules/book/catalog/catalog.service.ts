import { Injectable } from '@nestjs/common';
import { CatalogRepository } from './catalog.repository';
import { CatalogServiceInterface } from './interfaces/publicMangaService';
import { CatalogMangaQueryDto } from './dto/catalogMangaQuery.dto';
import { CatalogMangaListDto } from './dto/catalogManga.dto';

@Injectable()
export class CatalogService implements CatalogServiceInterface {
    constructor(private repository: CatalogRepository) {}

    async getCatalogManga(
        query: CatalogMangaQueryDto,
        userId?: number,
    ): Promise<CatalogMangaListDto> {
        return await this.repository.getCatalogManga(query, userId);
    }
}
