import { Prisma } from '@prisma/client';

export const getReadedChapterCountWhereInput = (bookId: number, tome: number, chapter: number) => {
    return {
        bookId,
        OR: [
            { tome: { lt: tome } },
            {
                tome: tome,
                chapter: { lt: chapter },
            },
        ],
    } satisfies Prisma.BookChaptersWhereInput;
};
