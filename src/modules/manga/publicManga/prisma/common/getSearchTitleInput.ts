import { Prisma } from '@prisma/client';

export const getSearchTitleInput = (search: string): Prisma.MangaTitleWhereInput => {
    return {
        OR: [
            { ru: { contains: search, mode: 'insensitive' } },
            { en: { contains: search, mode: 'insensitive' } },
            { origin: { contains: search, mode: 'insensitive' } },
        ],
    };
};
