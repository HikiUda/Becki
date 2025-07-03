import { Prisma } from '@prisma/client';
import { BookId } from 'src/modules/book/_common/model/bookId';

export const getCreateBookCoversInput = (
    bookId: BookId,
    covers: string[],
    isFirstMain: boolean = false,
) => {
    return covers.map((cover, ind) => ({
        bookId,
        cover,
        main: !ind && isFirstMain,
    })) satisfies Prisma.BookCoversCreateManyInput[];
};
