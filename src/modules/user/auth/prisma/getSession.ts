import { Prisma } from '@prisma/client';
import { prisma } from 'src/shared/prisma/prisma';

export const getSession = async (sessionId: number) => {
    return await prisma.userAuthToken.findUnique({
        where: { id: sessionId },
        select: { refresh: true },
    });
};
export type GetSessionReturnType = Prisma.PromiseReturnType<typeof getSession>;
