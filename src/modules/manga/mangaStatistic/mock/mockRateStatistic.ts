import {
    RateFullStatisticType,
    RateStatisticType,
} from '../entities/mangaStatistic/dto/rateStatistic';

export const emptyRateStatistic: RateStatisticType = {
    rateStatistic: [
        {
            title: '1',
            count: 0,
            percentage: 0,
        },
        {
            title: '2',
            count: 0,
            percentage: 0,
        },
        {
            title: '3',
            count: 0,
            percentage: 0,
        },
        {
            title: '4',
            count: 0,
            percentage: 0,
        },
        {
            title: '5',
            count: 0,
            percentage: 0,
        },
        {
            title: '6',
            count: 0,
            percentage: 0,
        },
        {
            title: '7',
            count: 0,
            percentage: 0,
        },
        {
            title: '8',
            count: 0,
            percentage: 0,
        },
        {
            title: '9',
            count: 0,
            percentage: 0,
        },
        {
            title: '10',
            count: 0,
            percentage: 0,
        },
    ],
};

export const mockRateFullStatistic: RateFullStatisticType = {
    rate: 0,
    rateCount: 0,
    ...emptyRateStatistic,
};
