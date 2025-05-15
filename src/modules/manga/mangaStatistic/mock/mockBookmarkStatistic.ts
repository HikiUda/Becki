import { BookmarkStatisticType } from '../entities/mangaStatistic/dto/bookmarkStatistic';

export const mockBookmarkStatistic: BookmarkStatisticType = {
    all: 0,
    bookmarks: [
        {
            title: 'Reading',
            count: 0,
            percentage: 0,
        },
        {
            title: 'Planned',
            count: 0,
            percentage: 0,
        },
        {
            title: 'Readed',
            count: 0,
            percentage: 0,
        },
        {
            title: 'Abandoned',
            count: 0,
            percentage: 0,
        },
        {
            title: 'Postponed',
            count: 0,
            percentage: 0,
        },
    ],
};
