import { Prisma } from '@prisma/client';

type WhereInput = Prisma.BookChaptersWhereInput;

export const getEditedChapterListWhereInput = (bookId: number, search: string) => {
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
    return { AND: [{ bookId }, { OR }] } satisfies WhereInput;
};
