import { Prisma } from '@prisma/client';
import { MutateBookChapterDto } from '../dto/mutateChapter.dto';
import { BookId } from 'src/modules/book/_common/model/bookId';

export const getCreateChapterInput = (bookId: BookId, dto: MutateBookChapterDto) => {
    return {
        title: { create: { ru: dto.title?.ru, en: dto.title?.en } },
        tome: dto.tome,
        chapter: dto.chapter || 1,
        book: { connect: { id: bookId } },
    } satisfies Prisma.BookChaptersCreateInput;
};
