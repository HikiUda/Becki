import { Prisma } from '@prisma/client';
import { BookId } from 'src/modules/book/_common/model/bookId';

export const getPrevChapterWhereInput = (bookId: BookId, tome: number, chapter: number) => {
    return {
        bookId,
        OR: [
            {
                tome: tome,
                chapter: { lt: chapter },
            },
            {
                tome: { lt: tome },
            },
        ],
    } satisfies Prisma.BookChaptersWhereInput;
};

export const getPrevChapterOrderByInput = () => {
    return [
        { tome: 'desc' },
        { chapter: 'desc' },
    ] satisfies Prisma.BookChaptersOrderByWithRelationInput[];
};
