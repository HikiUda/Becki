import { prisma } from 'src/shared/prisma/prisma';

export const getMangaCovers = async (mangaId: number) => {
    return await prisma.mangaCovers.findMany({
        where: { mangaId },
        select: { id: true, cover: true, main: true },
    });
};
