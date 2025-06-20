import { prisma } from 'src/shared/prisma/prisma';
import { MangaListItemLastUpdatedQueryDto } from '../../dto/lastUpdatedMangaQuery.dto';
import { getLastUpdatedMangasWhereInput } from './getLastUpdatedManga';

export const getLastUpdatedMangasCount = async (
    query: MangaListItemLastUpdatedQueryDto,
    userId?: number,
) => {
    const { scope } = query;
    if (scope === 'popular') {
        return await prisma.manga.count({ where: { statistic: { rate: { gte: 9 } } } });
    }

    return await prisma.chapters.count({
        orderBy: { createdAt: 'desc' },
        where: getLastUpdatedMangasWhereInput(scope, userId),
    });
};
