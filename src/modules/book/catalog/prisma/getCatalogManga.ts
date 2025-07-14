import { PrismaClient } from '@prisma/client';
import { getOrderInput } from './book/getOrderInput';
import { getCatalogMangaWhereInput } from './getCatalogMangaWhereInput';
import { CatalogMangaQuery } from '../dto/catalogMangaQuery.dto';
import { getSelectInput } from './book/getSelectInput';
import { UserId } from 'src/modules/authorization';

export const getCatalogManga = async (
    prisma: PrismaClient,
    query: CatalogMangaQuery,
    userId?: UserId,
) => {
    const { limit, page } = query;
    const skip = limit * (page - 1);

    const manga = await prisma.manga.findMany({
        take: limit,
        skip,
        orderBy: getOrderInput(query),
        where: getCatalogMangaWhereInput(query, userId),
        select: getSelectInput(userId),
    });
    const count = await prisma.manga.count({
        where: getCatalogMangaWhereInput(query),
    });
    return [manga, count] as const;
};
