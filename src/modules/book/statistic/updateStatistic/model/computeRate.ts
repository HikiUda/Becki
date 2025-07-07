import { PercentItem } from '../../__common/dto/percentItem.schema';
import { RateStatistic } from '../../__common/dto/rateStatistic';

export const rateValues = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] as const;
export type rateValuesCount = [
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

function computeRateValue(valueCount: number, rateCount: number) {
    return {
        count: valueCount,
        percentage: Math.round((valueCount / rateCount) * 10000) / 100,
    } satisfies PercentItem;
}

export function computeRate(rateSum: number, rateCount: number, rateValuesCount: rateValuesCount) {
    const rate = rateSum ? Math.round((rateSum / rateCount) * 100) / 100 : 0;

    const rateStatistic = {
        1: computeRateValue(rateValuesCount[0], rateCount),
        2: computeRateValue(rateValuesCount[1], rateCount),
        3: computeRateValue(rateValuesCount[2], rateCount),
        4: computeRateValue(rateValuesCount[3], rateCount),
        5: computeRateValue(rateValuesCount[4], rateCount),
        6: computeRateValue(rateValuesCount[5], rateCount),
        7: computeRateValue(rateValuesCount[6], rateCount),
        8: computeRateValue(rateValuesCount[7], rateCount),
        9: computeRateValue(rateValuesCount[8], rateCount),
        10: computeRateValue(rateValuesCount[9], rateCount),
    } satisfies RateStatistic;

    return { rate, rateStatistic };
}
