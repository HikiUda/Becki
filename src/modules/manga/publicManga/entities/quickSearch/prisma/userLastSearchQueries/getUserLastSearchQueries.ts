import { Prisma } from '@prisma/client';
import { prisma } from 'src/shared/prisma/prisma';

export const getUserLastSearchQueries = async (userId: number) => {
    const user = await prisma.user.findUnique({
        where: { id: userId },
        select: { lastSearchQueries: true },
    });
    return user?.lastSearchQueries || [];
};

export type GetUserLastSearchQueriesReturnType = Prisma.PromiseReturnType<
    typeof getUserLastSearchQueries
>;
