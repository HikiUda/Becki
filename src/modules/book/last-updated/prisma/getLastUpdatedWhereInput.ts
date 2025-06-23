import { Prisma } from '@prisma/client';
import { LastUpdatedScope } from '../dto/lastUpdatedQuery.dto';

export const getLastUpdatedWhereInput = (scope: LastUpdatedScope, userId?: number) => {
    if (scope === 'popular')
        return { manga: { statistic: { rate: { gte: 9 } } } } satisfies Prisma.ChaptersWhereInput;

    if (scope === 'my' && userId)
        return {
            manga: { bookmarks: { some: { userId, bookmark: { in: ['Reading', 'Readed'] } } } },
        } satisfies Prisma.ChaptersWhereInput;

    return {};
};
