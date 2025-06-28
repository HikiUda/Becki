import { Prisma } from '@prisma/client';
import { LastUpdatedScope } from '../dto/lastUpdatedQuery.dto';

export const getLastUpdatedWhereInput = (scope: LastUpdatedScope, userId?: number) => {
    if (scope === 'popular')
        return {
            book: { statistic: { rate: { gte: 9 } } },
        } satisfies Prisma.BookChaptersWhereInput;

    if (scope === 'my' && userId)
        return {
            book: { bookmarks: { some: { userId, bookmark: { in: ['Reading', 'Readed'] } } } },
        } satisfies Prisma.BookChaptersWhereInput;

    return {};
};
