import { prisma } from 'src/shared/prisma/prisma';
import { getMangaListStatistic } from 'src/modules/manga/publicManga/prisma/getMangaListStatistic';

export const getRelatedManga = async (id: number) => {
    const manga = await prisma.manga.findUnique({
        where: { id: id },
        select: { relatedManga: true },
    });
    if (!manga) return [];
    return await getMangaListStatistic({
        where: { id: { in: manga.relatedManga } },
        take: 10,
    });
};
