import { Prisma } from '@prisma/client';

export const getContinueReadBookChapterSelect = () => {
    return {
        id: true,
        tome: true,
        chapter: true,
        book: {
            select: {
                statistic: { select: { chapterCount: true } },
            },
        },
    } satisfies Prisma.BookChaptersSelect;
};

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
