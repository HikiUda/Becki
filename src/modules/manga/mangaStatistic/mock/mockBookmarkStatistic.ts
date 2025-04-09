import { BookmarkStatisticType } from '../entities/mangaStatistic/dto/bookmarkStatistic';

export const emptyBookmarkStatistic: BookmarkStatisticType = {
    all: 0,
    Readed: {
        name: 'Readed',
        count: 0,
        percentage: 0,
    },
    Planned: {
        name: 'Planned',
        count: 0,
        percentage: 0,
    },
    Reading: {
        name: 'Reading',
        count: 0,
        percentage: 0,
    },
    Abandoned: {
        name: 'Abandoned',
        count: 0,
        percentage: 0,
    },
    Postponed: {
        name: 'Postponed',
        count: 0,
        percentage: 0,
    },
};
export const mockBookmarkStatistic: BookmarkStatisticType = {
    all: 100,
    Readed: {
        name: 'Readed',
        count: 20,
        percentage: 20,
    },
    Planned: {
        name: 'Planned',
        count: 10,
        percentage: 10,
    },
    Reading: {
        name: 'Reading',
        count: 50,
        percentage: 50,
    },
    Abandoned: {
        name: 'Abandoned',
        count: 15,
        percentage: 15,
    },
    Postponed: {
        name: 'Postponed',
        count: 5,
        percentage: 5,
    },
};
