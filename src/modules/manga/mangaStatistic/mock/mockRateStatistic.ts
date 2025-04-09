import {
    RateFullStatisticType,
    RateStatisticType,
} from '../entities/mangaStatistic/dto/rateStatistic';

export const emptyRateStatistic: RateStatisticType = {
    '1': {
        name: 1,
        count: 0,
        percentage: 0,
    },
    '2': {
        name: 2,
        count: 0,
        percentage: 0,
    },
    '3': {
        name: 3,
        count: 0,
        percentage: 0,
    },
    '4': {
        name: 4,
        count: 0,
        percentage: 0,
    },
    '5': {
        name: 5,
        count: 0,
        percentage: 0,
    },
    '6': {
        name: 6,
        count: 0,
        percentage: 0,
    },
    '7': {
        name: 7,
        count: 0,
        percentage: 0,
    },
    '8': {
        name: 8,
        count: 0,
        percentage: 0,
    },
    '9': {
        name: 9,
        count: 0,
        percentage: 0,
    },
    '10': {
        name: 10,
        count: 0,
        percentage: 0,
    },
};

export const mockRateFullStatistic: RateFullStatisticType = {
    rate: 12,
    rateCount: 677,
    rateStatistic: emptyRateStatistic,
};
