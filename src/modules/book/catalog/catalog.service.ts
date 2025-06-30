import { Injectable } from '@nestjs/common';
import { CatalogRepository } from './catalog.repository';
import { CatalogServiceInterface } from './interfaces/publicMangaService';
import { CatalogMangaQuery } from './dto/catalogMangaQuery.dto';
import { CatalogMangaList } from './dto/catalogManga.dto';
import { CatalogRanobeList } from './dto/catalogRanobe.dto';
import { CatalogRanobeQuery } from './dto/catalogRanobeQuery.dto';

@Injectable()
export class CatalogService implements CatalogServiceInterface {
    constructor(private repository: CatalogRepository) {}

    async getCatalogManga(query: CatalogMangaQuery, userId?: number): Promise<CatalogMangaList> {
        return await this.repository.getCatalogManga(query, userId);
    }

    async getCatalogRanobe(query: CatalogRanobeQuery, userId?: number): Promise<CatalogRanobeList> {
        return await this.repository.getCatalogRanobe(query, userId);
    }
}
