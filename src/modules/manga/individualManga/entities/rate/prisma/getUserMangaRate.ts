import { prisma } from 'src/shared/prisma/prisma';
import { getUserMangaRateId } from '../helpers/getUserMangaRateId';

export const getUserMangaRate = async (mangaId: number, userId: number) => {
    return await prisma.mangaRating.findUnique({
        where: { id: getUserMangaRateId(mangaId, userId) },
        select: { rate: true, mangaId: true, userId: true },
    });
};
