import { Prisma, PrismaClient } from '@prisma/client';
import { getOrderInput } from './book/getOrderInput';
import { getCatalogMangaWhereInput } from './getCatalogMangaWhereInput';
import { CatalogMangaQueryDto } from '../dto/catalogMangaQuery.dto';
import { getSelectInput } from './book/getSelectInput';

export const getCatalogManga = async (
    prisma: PrismaClient,
    query: CatalogMangaQueryDto,
    userId?: number,
) => {
    const { limit, page, lang } = query;
    const skip = limit * (page - 1);

    const manga = await prisma.manga.findMany({
        take: limit,
        skip,
        orderBy: getOrderInput(query),
        where: getCatalogMangaWhereInput(query, userId),
        select: getSelectInput(lang, userId),
    });
    const count = await prisma.manga.count({
        where: getCatalogMangaWhereInput(query),
    });
    return [manga, count] as const;
};

export type CatalogMangaDB = Prisma.PromiseReturnType<typeof getCatalogManga>[0];
