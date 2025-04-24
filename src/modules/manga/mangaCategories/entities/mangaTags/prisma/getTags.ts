import { prisma } from 'src/common/helpers/prisma';

export const getTags = async (search: string) => {
    return await prisma.mangaTags.findMany({
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
