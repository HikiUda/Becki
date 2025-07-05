import { Prisma } from '@prisma/client';
import { BookId } from 'src/modules/book/_common/model/bookId';

type WhereInput = Prisma.BookChaptersWhereInput;

export const getChapterListWhereInput = (bookId: BookId, search: string) => {
    const searchNumber = isNaN(Number(search)) ? undefined : Number(search);
    const OR = [];

    if (search) {
        OR.push(
            { title: { ru: { contains: search, mode: 'insensitive' } } } satisfies WhereInput,
            { title: { en: { contains: search, mode: 'insensitive' } } } satisfies WhereInput,
        );
    }
    if (searchNumber) {
        OR.push(
            { chapter: searchNumber } satisfies WhereInput,
            { tome: searchNumber } satisfies WhereInput,
        );
    }
    return { AND: [{ bookId }, { OR }, { publish: true }] } satisfies WhereInput;
};
