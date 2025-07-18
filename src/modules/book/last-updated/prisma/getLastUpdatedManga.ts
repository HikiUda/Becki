import { PrismaClient } from '@prisma/client';
import { getLastUpdatedSelect } from './getLastUpdatedSelect';
import { LastUpdatedQuery } from '../dto/lastUpdatedQuery.dto';
import { getLastUpdatedWhereInput } from './getLastUpdatedWhereInput';
import { UserId } from 'src/modules/authorization';

export const getLastUpdatedManga = async (
    prisma: PrismaClient,
    query: LastUpdatedQuery,
    userId?: UserId,
) => {
    const { scope, limit, page, bookLang } = query;
    const skip = limit * (page - 1);

    const manga = await prisma.mangaChapters.findMany({
        orderBy: { updatedAt: 'desc' },
        where: getLastUpdatedWhereInput({ scope, userId, bookLang }),
        select: getLastUpdatedSelect(),
        distinct: scope === 'popular' ? ['bookId'] : undefined,
        skip,
        take: limit,
    });

    const count =
        scope === 'popular'
            ? await prisma.manga.count({
                  where: getLastUpdatedWhereInput({ scope, userId, bookLang }).book,
              })
            : await prisma.mangaChapters.count({
                  where: getLastUpdatedWhereInput({ scope, userId, bookLang }),
              });
    return [manga, count] as const;
};
