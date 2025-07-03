import { Prisma, PrismaClient } from '@prisma/client';
import { ContinueReadBook } from '../dto/continueReadBook.dto';
import { getContinueReadBookChapterSelect } from './getContinueReadBook';
import { BookId } from 'src/modules/book/_common/model/bookId';

const getContinueReadBook = async (prisma: PrismaClient) => {
    const chapter = await prisma.bookChapters.findFirst({
        select: getContinueReadBookChapterSelect(),
    });
    const readedChapterCount: number = 0;
    return [chapter, readedChapterCount] as const;
};

type GetContinueReadBook = Prisma.PromiseReturnType<typeof getContinueReadBook>;

export function toContinueReadBook(data: GetContinueReadBook, bookId: BookId): ContinueReadBook {
    const [chapter, readedChapterCount] = data;
    return {
        tome: chapter?.tome || 0,
        chapter: chapter?.chapter || 0,
        chapterId: chapter?.id || null,
        chapterCount: chapter?.book.statistic?.chapterCount || 0,
        readedChapterCount,
        bookId,
    };
}
