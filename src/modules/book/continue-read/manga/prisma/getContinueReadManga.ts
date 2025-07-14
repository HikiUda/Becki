import { PrismaClient } from '@prisma/client';
import { getContinueReadBookChapterSelect } from '../../__common/prisma/getContinueReadBook';
import { getReadedChapterCountWhereInput } from '../../__common/prisma/getContinueReadBook';
import { UserId } from 'src/modules/authorization';
import { MangaId } from 'src/modules/book/_common/model/bookId';

export const getContinueReadManga = async (
    prisma: PrismaClient,
    userId: UserId | null,
    bookId: MangaId,
) => {
    const lastChapter = userId
        ? await prisma.mangaBookmarks
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
        ? await prisma.mangaChapters.count({
              where: getReadedChapterCountWhereInput(bookId, lastChapter.tome, lastChapter.chapter),
          })
        : 0;

    const firstChapter = lastChapter
        ? null
        : await prisma.mangaChapters.findFirst({
              where: { bookId },
              orderBy: [{ tome: 'asc' }, { chapter: 'asc' }],
              select: getContinueReadBookChapterSelect(),
          });

    return [lastChapter || firstChapter, readedChapterCount] as const;
};
