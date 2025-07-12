import { Prisma } from '@prisma/client';

export const getContinueReadBookListSelect = () => {
    return {
        book: {
            select: {
                id: true,
                urlId: true,
                title: { select: { main: true } },
                covers: { where: { main: true }, select: { cover: true } },
            },
        },
        chapter: { select: { chapter: true, tome: true, id: true } },
    } satisfies Prisma.BookBookmarksSelect;
};
