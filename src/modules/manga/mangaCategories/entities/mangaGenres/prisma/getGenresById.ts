import { prisma } from 'src/shared/prisma/prisma';

export const getGenresById = async (genresId: number[]) => {
    return await prisma.mangaGenres.findMany({
        where: { id: { in: genresId } },
        select: { id: true, ru: true, en: true },
    });
};
