import { BookmarkStatisticType } from '../entities/mangaStatistic/dto/bookmarkStatistic';

export const emptyBookmarkStatistic: BookmarkStatisticType = {
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
export const mockBookmarkStatistic: BookmarkStatisticType = {
    all: 100,
    bookmarks: [
        {
            title: 'Reading',
            count: 20,
            percentage: 20,
        },
        {
            title: 'Planned',
            count: 10,
            percentage: 10,
        },
        {
            title: 'Readed',
            count: 50,
            percentage: 50,
        },
        {
            title: 'Abandoned',
            count: 15,
            percentage: 15,
        },
        {
            title: 'Postponed',
            count: 5,
            percentage: 5,
        },
    ],
};
