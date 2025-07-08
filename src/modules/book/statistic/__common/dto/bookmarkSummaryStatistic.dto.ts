import { BookmarkStatistic } from 'src/modules/book/_common/model/bookStatistic';
import { ApiProperty } from '@nestjs/swagger';

export class BookmarkSummaryStatistic {
    @ApiProperty()
    count: number;
    @ApiProperty()
    statistic: BookmarkStatistic;
}
