import { RateStatistic } from 'src/modules/book/_common/model/bookStatistic';
import { ApiProperty } from '@nestjs/swagger';

export class RateSummaryStatistic {
    @ApiProperty()
    rate: number;
    @ApiProperty()
    count: number;
    @ApiProperty()
    statistic: RateStatistic;
}
