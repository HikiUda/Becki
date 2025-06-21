import { PrismaClient } from '@prisma/client';

export const getUserLastQueries = async (prisma: PrismaClient, userId: number) => {
    const user = await prisma.user.findUnique({
        where: { id: userId },
        select: { lastQuickSearch: { select: { manga: true } } },
    });
    return user?.lastQuickSearch?.manga || [];
};
