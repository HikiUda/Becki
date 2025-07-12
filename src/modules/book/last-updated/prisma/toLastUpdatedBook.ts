import { Lang } from 'src/shared/dto/langQuery.dto';
import { Prisma, PrismaClient } from '@prisma/client';
import { getLastUpdatedSelect } from './getLastUpdatedSelect';
import { LastUpdatedBook } from '../dto/lastUpdatedBook.dto';

const getLastUpdatedBooks = async (prisma: PrismaClient) => {
    return await prisma.bookChapters.findMany({
        select: getLastUpdatedSelect(),
    });
};
export type GetLastUpdatedBooks = Prisma.PromiseReturnType<typeof getLastUpdatedBooks>[number];

export function toLastUpdatedBook<T extends string>(
    data: (GetLastUpdatedBooks & { book: { type: T } })[],
): (LastUpdatedBook & { type: T })[] {
    return data.map((chapter) => {
        return {
            id: chapter.book.id,
            urlId: chapter.book.urlId,
            title: chapter.book.title?.main || '',
            cover: chapter.book.covers[0]?.cover || '',
            type: chapter.book.type,
            tome: chapter.tome,
            chapter: chapter.chapter,
            chapterCreatedAt: chapter.createdAt,
            chapterId: chapter.id,
        };
    });
}
