import { prisma } from 'src/shared/prisma/prisma';
import { getUserMangaRateId } from '../helpers/getUserMangaRateId';

export const setUserMangaRate = async (mangaId: number, userId: number, rate: number) => {
    const id = getUserMangaRateId(mangaId, userId);
    return await prisma.mangaRating.upsert({
        where: { id },
        create: { id, rate, userId, mangaId },
        update: { rate },
        select: { rate: true, mangaId: true, userId: true },
    });
};
