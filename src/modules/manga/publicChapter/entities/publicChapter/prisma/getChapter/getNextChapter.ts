import { prisma } from 'src/shared/prisma/prisma';

export const getNextChapter = async (tome: number, chapter: number, mangaId: number) => {
    return await prisma.chapters.findFirst({
        where: {
            mangaId,
            OR: [
                {
                    tome: tome,
                    chapter: { gt: chapter },
                },
                {
                    tome: { gt: tome },
                },
            ],
        },
        orderBy: [{ tome: 'asc' }, { chapter: 'asc' }],
    });
};
