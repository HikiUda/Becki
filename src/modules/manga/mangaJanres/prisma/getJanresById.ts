import { prisma } from 'src/common/helpers/prisma';

export const getJanresById = async (janresId: number[]) => {
    return await prisma.mangaJanres.findMany({
        where: { id: { in: janresId } },
        select: { id: true, ru: true, en: true },
    });
};
