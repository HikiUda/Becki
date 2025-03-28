import { Prisma } from '@prisma/client';
import { prisma } from 'src/common/helpers/prisma';

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
export type createSessionReturnType = Prisma.PromiseReturnType<typeof createSession>;
