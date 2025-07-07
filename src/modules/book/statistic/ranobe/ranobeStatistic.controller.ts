import { Controller, Get, Param } from '@nestjs/common';
import { BookStatisticControllerInterface } from '../__common/interfaces/bookStatisticController';
import { RanobeIdParam } from '../../_common/model/bookId';
import { BookmarkSummaryStatistic } from '../__common/dto/bookmarkStatistic.dto';
import { RateSummaryStatistic } from '../__common/dto/rateStatistic';
import { ApiOkResponse } from '@nestjs/swagger';
import { ApiCustomNotFoundResponse } from 'src/shared/decorators/api40xResponses';
import { RanobeStatisticService } from './ranobeStatistic.service';

@ApiCustomNotFoundResponse()
@Controller('ranobe/:ranobeId/statistic')
export class RanobeStatisticController implements BookStatisticControllerInterface {
    constructor(private service: RanobeStatisticService) {}

    @Get('rate')
    @ApiOkResponse({ type: RateSummaryStatistic })
    async getRateStatistic(@Param() params: RanobeIdParam): Promise<RateSummaryStatistic> {
        return await this.service.getRateStatistic(params.ranobeId);
    }

    @Get('bookmark')
    @ApiOkResponse({ type: BookmarkSummaryStatistic })
    async getBookmarkStatistic(@Param() params: RanobeIdParam): Promise<BookmarkSummaryStatistic> {
        return await this.service.getBookmarkStatistic(params.ranobeId);
    }
}
