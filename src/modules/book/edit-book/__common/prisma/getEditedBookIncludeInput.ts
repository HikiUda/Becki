import { Prisma } from '@prisma/client';

export const getEditedBookIncludeInput = () => {
    return {
        title: true,
        description: true,
        authors: { select: { id: true, name: true, avatar: true } },
        artists: { select: { id: true, name: true, avatar: true } },
        publishers: { select: { id: true, name: true, avatar: true } },
    } satisfies Prisma.BookInclude;
};
