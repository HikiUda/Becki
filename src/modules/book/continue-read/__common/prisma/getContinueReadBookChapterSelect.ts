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
