import { Prisma } from '@prisma/client';
import { prisma } from 'src/shared/prisma/prisma';

export const createSession = async (userId: number) => {
    return await prisma.userAuthToken.create({
        data: {
            refresh: '',
            user: {
                connect: { id: userId },
            },
        },
        select: { id: true },
    });
};
export type CreateSessionReturnType = Prisma.PromiseReturnType<typeof createSession>;
