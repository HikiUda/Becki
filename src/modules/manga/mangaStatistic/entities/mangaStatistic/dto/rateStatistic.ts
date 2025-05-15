import { z } from 'zod';
import { createStatisticItem, PercentItemScheme, StatisticItemDto } from './statisticItem.Scheme';
import { title } from 'process';
import { createZodDto } from '@anatine/zod-nestjs';
import { ApiProperty } from '@nestjs/swagger';

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

export class ApiRateFullStatisticDto implements RateFullStatisticType {
    @ApiProperty()
    rate: number;
    @ApiProperty()
    rateCount: number;
    @ApiProperty({
        type: [StatisticItemDto],
        minItems: 10,
        maxItems: 10,
        description: 'Массив из 10 элементов рейтинга от 1 до 10',
    })
    rateStatistic: [
        StatisticItemDto,
        StatisticItemDto,
        StatisticItemDto,
        StatisticItemDto,
        StatisticItemDto,
        StatisticItemDto,
        StatisticItemDto,
        StatisticItemDto,
        StatisticItemDto,
        StatisticItemDto,
    ];
}
