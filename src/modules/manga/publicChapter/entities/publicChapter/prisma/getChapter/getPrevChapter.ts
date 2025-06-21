import { prisma } from 'src/shared/prisma/prisma';

export const getPrevChapter = async (tome: number, chapter: number, mangaId: number) => {
    return await prisma.chapters.findFirst({
        where: {
            mangaId,
            OR: [
                {
                    tome: tome,
                    chapter: { lt: chapter },
                },
                {
                    tome: { lt: tome },
                },
            ],
        },
        orderBy: [{ tome: 'desc' }, { chapter: 'desc' }],
    });
};
