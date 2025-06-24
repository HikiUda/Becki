import { PrismaClient } from '@prisma/client';

export const getBooksByUrlIds = async (prisma: PrismaClient, ids: string[]) => {
    const manga = await prisma.manga.findMany({
        where: { urlId: { in: ids } },
        select: { id: true, urlId: true },
    });
    const ranobe: { id: number; urlId: string }[] = [];

    return { manga, ranobe } as const;
};
