import { prisma } from 'src/common/helpers/prisma';
import { BookmarkStatisticScheme, BookmarkStatisticType } from '../dto/bookmarkStatistic';
import { mockBookmarkStatistic } from '../../../mock/mockBookmarkStatistic';

export const getBookmarkStatistic = async (
    mangaId: number,
): Promise<BookmarkStatisticType | null> => {
    const data = await prisma.manga.findUnique({
        where: { id: mangaId },
        select: {
            mangaStatistic: { select: { bookmarkStatistic: true } },
        },
    });
    if (!data?.mangaStatistic) return null;

    const bookmarkStatistic = BookmarkStatisticScheme.safeParse(
        data.mangaStatistic.bookmarkStatistic,
    );

    return bookmarkStatistic.success ? bookmarkStatistic.data : mockBookmarkStatistic;
};
