import { Prisma } from '@prisma/client';
import { prisma } from 'src/common/helpers/prisma';

export const removeSession = async (sessionId: number) => {
    return await prisma.userAuthToken.delete({
        where: { id: sessionId },
    });
};
export type removeSessionReturnType = Prisma.PromiseReturnType<typeof removeSession>;
