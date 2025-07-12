import { Prisma } from '@prisma/client';

export const getLastUpdatedSelect = () => {
    return {
        id: true,
        tome: true,
        chapter: true,
        createdAt: true,
        book: {
            select: {
                id: true,
                urlId: true,
                title: { select: { main: true } },
                type: true,
                covers: { where: { main: true }, select: { cover: true } },
            },
        },
    } satisfies Prisma.BookChaptersSelect;
};
