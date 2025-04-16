import { z } from 'zod';
import { createStatisticItem } from './statisticItem.Scheme';

export const RateStatisticScheme = z.object({
    rateStatistic: z.tuple([
        createStatisticItem('1'),
        createStatisticItem('2'),
        createStatisticItem('3'),
        createStatisticItem('4'),
        createStatisticItem('5'),
        createStatisticItem('6'),
        createStatisticItem('7'),
        createStatisticItem('8'),
        createStatisticItem('9'),
        createStatisticItem('10'),
    ]),
});

export type RateStatisticType = z.infer<typeof RateStatisticScheme>;
export interface RateFullStatisticType extends RateStatisticType {
    rate: number;
    rateCount: number;
}
