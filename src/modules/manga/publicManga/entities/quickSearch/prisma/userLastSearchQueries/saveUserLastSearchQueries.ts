import { Prisma } from '@prisma/client';
import { prisma } from 'src/common/helpers/prisma';

export const saveUserLastSearchQueries = async (search: string, userId: number) => {
    if (!search) return;
    const user = await prisma.user.findUnique({
        where: { id: userId },
        select: { lastSearchQueries: true },
    });
    if (user) {
        const lastSearchQueries = [search]
            .concat(user.lastSearchQueries.filter((query) => query !== search))
            .slice(0, 5);
        await prisma.user.update({
            where: { id: userId },
            data: { lastSearchQueries: { set: lastSearchQueries } },
        });
    }
};

export type SaveUserLastSearchQueriesReturnType = Prisma.PromiseReturnType<
    typeof saveUserLastSearchQueries
>;
