import { PrismaClient } from '@prisma/client';
import { getLastUpdatedSelect } from './getLastUpdatedSelect';
import { LastUpdatedQuery } from '../dto/lastUpdatedQuery.dto';
import { getLastUpdatedWhereInput } from './getLastUpdatedWhereInput';
import { UserId } from 'src/modules/authorization';

export const getLastUpdatedRanobe = async (
    prisma: PrismaClient,
    query: LastUpdatedQuery,
    userId?: UserId,
) => {
    const { scope, limit, page, bookLang } = query;
    const skip = limit * (page - 1);

    const ranobe = await prisma.ranobeChapters.findMany({
        orderBy: { createdAt: 'desc' },
        where: getLastUpdatedWhereInput({ scope, userId, bookLang }),
        select: getLastUpdatedSelect(),
        distinct: scope === 'popular' ? ['bookId'] : undefined,
        skip,
        take: limit,
    });

    const count =
        scope === 'popular'
            ? await prisma.ranobe.count({
                  where: getLastUpdatedWhereInput({ scope, userId, bookLang }).book,
              })
            : await prisma.ranobeChapters.count({
                  where: getLastUpdatedWhereInput({ scope, userId, bookLang }),
              });

    return [ranobe, count] as const;
};
