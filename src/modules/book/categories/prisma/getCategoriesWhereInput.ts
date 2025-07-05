import { Prisma } from '@prisma/client';

export const getCategoriesWhereInput = (search: string) => {
    return {
        OR: [
            {
                ru: { contains: search, mode: 'insensitive' },
            },
            {
                en: { contains: search, mode: 'insensitive' },
            },
        ],
    } satisfies Prisma.BookGenresWhereInput & Prisma.BookTagsWhereInput;
};
