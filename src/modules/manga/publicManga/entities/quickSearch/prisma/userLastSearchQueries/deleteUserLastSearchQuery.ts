import { Prisma } from '@prisma/client';
import { prisma } from 'src/common/helpers/prisma';

export const deleteUserLastSearchQuery = async (search: string, userId: number) => {
    if (!search) return;
    const user = await prisma.user.findUnique({
        where: { id: userId },
        select: { lastSearchQueries: true },
    });
    if (user) {
        const lastSearchQueries = user.lastSearchQueries.filter((query) => query !== search);
        await prisma.user.update({
            where: { id: userId },
            data: { lastSearchQueries: { set: lastSearchQueries } },
        });
    }
};

export type DeleteUserLastSearchQueryReturnType = Prisma.PromiseReturnType<
    typeof deleteUserLastSearchQuery
>;
