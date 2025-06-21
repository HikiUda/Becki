import { Prisma } from '@prisma/client';
import { prisma } from 'src/shared/prisma/prisma';

export const removeSession = async (sessionId: number) => {
    return await prisma.userAuthToken.delete({
        where: { id: sessionId },
    });
};
export type RemoveSessionReturnType = Prisma.PromiseReturnType<typeof removeSession>;
