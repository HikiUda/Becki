import { Prisma, PrismaClient } from '@prisma/client';
import { getChapterSelect } from './getChapterSelect';
import { UserId } from 'src/modules/user/auth';
import { Lang } from 'src/shared/dto/langQuery.dto';
import { BookChapter } from '../dto/bookChapter.dto';

const getChapter = async (prisma: PrismaClient) => {
    return await prisma.bookChapters.findUnique({
        where: { id: 0 },
        select: getChapterSelect(0 as UserId),
    });
};
type GetChapter = Prisma.PromiseReturnType<typeof getChapter>;

const getNeighbourChapter = async (prisma: PrismaClient) => {
    return await prisma.bookChapters.findFirst({
        where: { id: 0 },
        select: { id: true, tome: true, chapter: true },
    });
};
type GetNeighbourChapter = Prisma.PromiseReturnType<typeof getNeighbourChapter>;

export function toBookChapter(
    chapter: Exclude<GetChapter, null>,
    prevChapter: GetNeighbourChapter,
    nextChapter: GetNeighbourChapter,
): BookChapter {
    return {
        id: chapter.id,
        title: chapter.title,
        tome: chapter.tome,
        chapter: chapter.chapter,
        bookTitle: chapter.book.title?.main || '',
        prevChapter,
        nextChapter,
        isUserLiked: !!chapter.usersLike?.length,
        isUserViewed: !!chapter.usersView?.length,
    };
}
