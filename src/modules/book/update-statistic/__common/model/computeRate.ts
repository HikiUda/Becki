import { RateStatistic } from 'src/modules/book/_common/model/bookStatistic';
import { computePercentItem } from './computePercentItem';

export const RateValues = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] as const;
export type RateValues = typeof RateValues;
export type RateValuesCount = [
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
];

export function computeRate(rateSum: number, rateCount: number, rateValuesCount: RateValuesCount) {
    const rate = rateSum ? Math.round((rateSum / rateCount) * 100) / 100 : 0;

    const rateStatistic = {
        1: computePercentItem(rateValuesCount[0], rateCount),
        2: computePercentItem(rateValuesCount[1], rateCount),
        3: computePercentItem(rateValuesCount[2], rateCount),
        4: computePercentItem(rateValuesCount[3], rateCount),
        5: computePercentItem(rateValuesCount[4], rateCount),
        6: computePercentItem(rateValuesCount[5], rateCount),
        7: computePercentItem(rateValuesCount[6], rateCount),
        8: computePercentItem(rateValuesCount[7], rateCount),
        9: computePercentItem(rateValuesCount[8], rateCount),
        10: computePercentItem(rateValuesCount[9], rateCount),
    } satisfies RateStatistic;

    return { rate, rateStatistic };
}
