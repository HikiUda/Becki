import { PrismaClient } from '@prisma/client';
import { getContinueReadBookChapterSelect } from '../../__common/prisma/getContinueReadBook';
import { getReadedChapterCountWhereInput } from '../../__common/prisma/getContinueReadBook';
import { UserId } from 'src/modules/authorization';
import { RanobeId } from 'src/modules/book/_common/model/bookId';

export const getContinueReadRanobe = async (
    prisma: PrismaClient,
    userId: UserId | null,
    bookId: RanobeId,
) => {
    const lastChapter = userId
        ? await prisma.ranobeBookmarks
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
        ? await prisma.ranobeChapters.count({
              where: getReadedChapterCountWhereInput(bookId, lastChapter.tome, lastChapter.chapter),
          })
        : 0;

    const firstChapter = lastChapter
        ? null
        : await prisma.ranobeChapters.findFirst({
              where: { bookId },
              orderBy: [{ tome: 'asc' }, { chapter: 'asc' }],
              select: getContinueReadBookChapterSelect(),
          });

    return [lastChapter || firstChapter, readedChapterCount] as const;
};
