import { Injectable } from '@nestjs/common';
import { CatalogRepositoryInterface } from './interfaces/publicMangaRepository';
import { getCatalogManga } from './prisma/getCatalogManga';
import { getPagination } from 'src/shared/helpers/pagination/getPagination';
import { CatalogMangaQueryDto } from './dto/catalogMangaQuery.dto';
import { CatalogMangaListDto } from './dto/catalogManga.dto';
import { PrismaService } from 'src/shared/prisma/prisma.service';
import { toCatalogBookDto } from './prisma/book/toCatalogBookDto';

@Injectable()
export class CatalogRepository implements CatalogRepositoryInterface {
    constructor(private prisma: PrismaService) {}

    async getCatalogManga(
        query: CatalogMangaQueryDto,
        userId?: number,
    ): Promise<CatalogMangaListDto> {
        const [manga, count] = await getCatalogManga(this.prisma, query, userId);
        const data = toCatalogBookDto(manga, query.lang);
        return {
            data,
            ...getPagination(count, query.page, query.limit),
        };
    }
}
