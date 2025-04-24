import { prisma } from 'src/common/helpers/prisma';

export const getGenres = async (search: string) => {
    return await prisma.mangaGenres.findMany({
        where: {
            OR: [
                {
                    ru: { contains: search, mode: 'insensitive' },
                },
                {
                    en: { contains: search, mode: 'insensitive' },
                },
            ],
        },
        select: { id: true, ru: true, en: true },
    });
};
