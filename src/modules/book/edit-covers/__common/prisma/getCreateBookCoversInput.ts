import { Prisma } from '@prisma/client';

export const getCreateBookCoversInput = (
    bookId: number,
    covers: string[],
    isFirstMain: boolean = false,
) => {
    return covers.map((cover, ind) => ({
        bookId,
        cover,
        main: !ind && isFirstMain,
    })) satisfies Prisma.BookCoversCreateManyInput[];
};
