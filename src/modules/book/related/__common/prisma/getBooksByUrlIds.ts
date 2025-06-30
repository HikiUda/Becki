import { PrismaClient } from '@prisma/client';

export const getBooksByUrlIds = async (prisma: PrismaClient, ids: string[]) => {
    const manga = await prisma.manga.findMany({
        where: { urlId: { in: ids } },
        select: { id: true, urlId: true },
    });
    const ranobe = await prisma.ranobe.findMany({
        where: { urlId: { in: ids } },
        select: { id: true, urlId: true },
    });

    return { manga, ranobe } as const;
};
