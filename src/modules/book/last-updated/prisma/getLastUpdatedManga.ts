import { PrismaClient } from '@prisma/client';
import { getLastUpdatedSelect } from './getLastUpdatedSelect';
import { LastUpdatedQuery } from '../dto/lastUpdatedQuery.dto';
import { getLastUpdatedWhereInput } from './getLastUpdatedWhereInput';

export const getLastUpdatedManga = async (
    prisma: PrismaClient,
    query: LastUpdatedQuery,
    userId?: number,
) => {
    const { scope, lang, limit, page } = query;
    const skip = limit * (page - 1);

    const manga = await prisma.mangaChapters.findMany({
        orderBy: { createdAt: 'desc' },
        where: getLastUpdatedWhereInput(scope, userId),
        select: getLastUpdatedSelect(lang),
        distinct: scope === 'popular' ? ['bookId'] : undefined,
        skip,
        take: limit,
    });

    const count =
        scope === 'popular'
            ? await prisma.manga.count({ where: getLastUpdatedWhereInput(scope, userId).book })
            : await prisma.mangaChapters.count({
                  where: getLastUpdatedWhereInput(scope, userId),
              });

    return [manga, count] as const;
};
