import { prisma } from 'src/common/helpers/prisma';
import { MangaListItemLastUpdatedQueryDto } from '../../dto/mangaListItem/mangaListItemLastUpdated.dto';
import { getLastUpdatedMangasWhereInput } from './getLastUpdatedManga';

export const getLastUpdatedMangasPagination = async (
    query: MangaListItemLastUpdatedQueryDto,
    userId?: number,
) => {
    const { scope } = query;
    if (scope === 'popular') {
        return await prisma.manga.count({ where: { rate: { gte: 9 } } });
    }

    return await prisma.chapters.count({
        orderBy: { createdAt: 'desc' },
        where: getLastUpdatedMangasWhereInput(scope, userId),
    });
};
