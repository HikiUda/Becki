import { Prisma } from '@prisma/client';

export const getSearchOtherTitleInput = (
    search: string,
): Prisma.MangaOtherTitlesListRelationFilter => {
    return {
        some: { title: { contains: search, mode: 'insensitive' } },
    };
};
