import { Injectable } from '@nestjs/common';
import { CatalogRepositoryInterface } from './interfaces/publicMangaRepository';
import { getCatalogManga } from './prisma/getCatalogManga';
import { getPagination } from 'src/shared/dto/pagination.dto';
import { CatalogMangaQuery } from './dto/catalogMangaQuery.dto';
import { CatalogMangaList } from './dto/catalogManga.dto';
import { PrismaService } from 'src/shared/prisma/prisma.service';
import { toCatalogBook } from './prisma/book/toCatalogBook';
import { getCatalogRanobe } from './prisma/getCatalogRanobe';
import { CatalogRanobeList } from './dto/catalogRanobe.dto';
import { CatalogRanobeQuery } from './dto/catalogRanobeQuery.dto';
import { UserId } from 'src/modules/authorization';

@Injectable()
export class CatalogRepository implements CatalogRepositoryInterface {
    constructor(private prisma: PrismaService) {}

    async getCatalogManga(query: CatalogMangaQuery, userId?: UserId): Promise<CatalogMangaList> {
        const [manga, count] = await getCatalogManga(this.prisma, query, userId);
        const data = toCatalogBook(manga);
        return {
            data,
            ...getPagination(count, query.page, query.limit),
        };
    }

    async getCatalogRanobe(query: CatalogRanobeQuery, userId?: UserId): Promise<CatalogRanobeList> {
        const [ranobe, count] = await getCatalogRanobe(this.prisma, query, userId);
        const data = toCatalogBook(ranobe);
        return {
            data,
            ...getPagination(count, query.page, query.limit),
        };
    }
}
