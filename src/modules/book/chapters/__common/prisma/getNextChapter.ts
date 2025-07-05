import { Prisma } from '@prisma/client';
import { BookId } from 'src/modules/book/_common/model/bookId';

export const getNextChapterWhereInput = (bookId: BookId, tome: number, chapter: number) => {
    return {
        bookId,
        OR: [
            {
                tome: tome,
                chapter: { gt: chapter },
            },
            {
                tome: { gt: tome },
            },
        ],
    } satisfies Prisma.BookChaptersWhereInput;
};

export const getNextChapterOrderByInput = () => {
    return [
        { tome: 'asc' },
        { chapter: 'asc' },
    ] satisfies Prisma.BookChaptersOrderByWithRelationInput[];
};
