import { prisma } from 'src/common/helpers/prisma';

export const getTagsById = async (tagsId: number[]) => {
    return await prisma.mangaTags.findMany({
        where: { id: { in: tagsId } },
        select: { id: true, ru: true, en: true },
    });
};
