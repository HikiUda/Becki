import { PrismaClient } from '@prisma/client';
import { getContinueReadBookChapterSelect } from '../../__common/prisma/getContinueReadBookChapterSelect';
import { getReadedChapterCountWhereInput } from '../../__common/prisma/getReadedChapterCountWhereInput';

export const getContinueReadManga = async (
    prisma: PrismaClient,
    userId: number | null,
    bookId: number,
) => {
    const lastChapter = userId
        ? await prisma.bookBookmarks
              .findFirst({
                  where: { userId, bookId },
                  select: {
                      chapter: {
                          select: getContinueReadBookChapterSelect(),
                      },
                  },
              })
              .then((data) => data?.chapter || null)
        : null;

    const readedChapterCount = lastChapter
        ? await prisma.bookChapters.count({
              where: getReadedChapterCountWhereInput(bookId, lastChapter.tome, lastChapter.chapter),
          })
        : 0;

    const firstChapter = lastChapter
        ? null
        : await prisma.bookChapters.findFirst({
              where: { bookId },
              orderBy: [{ tome: 'asc' }, { chapter: 'asc' }],
              select: getContinueReadBookChapterSelect(),
          });

    return [lastChapter || firstChapter, readedChapterCount] as const;
};
