import { z } from 'zod';
import { PercentItemSchema } from './percentItem.schema';
import { ApiProperty } from '@nestjs/swagger';
import { createZodDto } from '@anatine/zod-nestjs';

export const RateStatisticSchema = z.object({
    1: PercentItemSchema,
    2: PercentItemSchema,
    3: PercentItemSchema,
    4: PercentItemSchema,
    5: PercentItemSchema,
    6: PercentItemSchema,
    7: PercentItemSchema,
    8: PercentItemSchema,
    9: PercentItemSchema,
    10: PercentItemSchema,
});

export class RateStatistic extends createZodDto(RateStatisticSchema) {}

export class RateSummaryStatistic {
    @ApiProperty()
    rate: number;
    @ApiProperty()
    count: number;
    @ApiProperty()
    statistic: RateStatistic;
}
