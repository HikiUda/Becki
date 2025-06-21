import { prisma } from 'src/shared/prisma/prisma';
import { BookmarkStatisticScheme, BookmarkStatisticType } from '../dto/bookmarkStatistic';
import { mockBookmarkStatistic } from '../../../mock/mockBookmarkStatistic';

export const getBookmarkStatistic = async (
    mangaId: number,
): Promise<BookmarkStatisticType | null> => {
    const data = await prisma.manga.findUnique({
        where: { id: mangaId },
        select: {
            statistic: { select: { bookmarkStatistic: true } },
        },
    });
    if (!data?.statistic) return null;

    const bookmarkStatistic = BookmarkStatisticScheme.safeParse(data.statistic.bookmarkStatistic);

    return bookmarkStatistic.success ? bookmarkStatistic.data : mockBookmarkStatistic;
};
