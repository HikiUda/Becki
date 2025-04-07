import { Prisma } from '@prisma/client';
import { prisma } from 'src/common/helpers/prisma';

export const saveAuthTokens = async (refresh: string, sessionId: number) => {
    return await prisma.userAuthToken.update({
        where: { id: sessionId },
        data: { refresh },
        select: { refresh: true },
    });
};
export type SaveAuthTokensReturnType = Prisma.PromiseReturnType<typeof saveAuthTokens>;
