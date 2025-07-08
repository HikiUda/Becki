import { Controller, Get, Param } from '@nestjs/common';
import { BookStatisticControllerInterface } from '../__common/interfaces/bookStatisticController';
import { MangaStatisticService } from './mangaStatistic.service';
import { MangaIdParam } from '../../_common/model/bookId';
import { BookmarkSummaryStatistic } from '../__common/dto/bookmarkSummaryStatistic.dto';
import { RateSummaryStatistic } from '../__common/dto/rateSummaryStatistic.dto';
import { ApiOkResponse } from '@nestjs/swagger';
import { ApiCustomNotFoundResponse } from 'src/shared/decorators/api40xResponses';

@ApiCustomNotFoundResponse()
@Controller('manga/:mangaId/statistic')
export class MangaStatisticController implements BookStatisticControllerInterface {
    constructor(private service: MangaStatisticService) {}

    @Get('rate')
    @ApiOkResponse({ type: RateSummaryStatistic })
    async getRateStatistic(@Param() params: MangaIdParam): Promise<RateSummaryStatistic> {
        return await this.service.getRateStatistic(params.mangaId);
    }

    @Get('bookmark')
    @ApiOkResponse({ type: BookmarkSummaryStatistic })
    async getBookmarkStatistic(@Param() params: MangaIdParam): Promise<BookmarkSummaryStatistic> {
        return await this.service.getBookmarkStatistic(params.mangaId);
    }
}
