import { Prisma } from '@prisma/client';
import { MutateBookChapterDto } from '../dto/mutateChapter.dto';
import { BookId } from 'src/modules/book/_common/model/bookId';

export const getCreateChapterInput = (bookId: BookId, dto: MutateBookChapterDto) => {
    return {
        title: dto.title,
        tome: dto.tome,
        chapter: dto.chapter || 1,
        book: { connect: { id: bookId } },
    } satisfies Prisma.BookChaptersCreateInput;
};
