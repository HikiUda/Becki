import { Controller, Get, Param } from '@nestjs/common';
import { MangaStatisticControllerInterface } from './interfaces/mangaStatisticController';
import { MangaStatisticService } from './mangaStatistic.service';
import { ApiBookmarkStatisticDto, BookmarkStatisticType } from './dto/bookmarkStatistic';
import { ApiRateFullStatisticDto, RateFullStatisticType } from './dto/rateStatistic';
import { ValidateMangaIdPipe } from 'src/modules/manga/common/pipes/ValidateMangaIdPipe';
import { ApiMangaIdParam } from 'src/modules/manga/common/decorators/ApiMangaIdParam/ApiMangaIdParam';
import { ApiOkResponse } from '@nestjs/swagger';
import { mockBookmarkStatistic } from '../../mock/mockBookmarkStatistic';
import { mockRateFullStatistic } from '../../mock/mockRateStatistic';

@ApiMangaIdParam()
@Controller('manga/statistic/:id')
export class MangaStatisticController implements MangaStatisticControllerInterface {
    constructor(private mangaStatisticService: MangaStatisticService) {}

    @Get('rate')
    @ApiOkResponse({ type: ApiRateFullStatisticDto, example: mockRateFullStatistic })
    async getRateStatistic(
        @Param('id', new ValidateMangaIdPipe()) id: number,
    ): Promise<RateFullStatisticType> {
        return await this.mangaStatisticService.getRateStatistic(id);
    }
    @Get('bookmark')
    @ApiOkResponse({ type: ApiBookmarkStatisticDto, example: mockBookmarkStatistic })
    async getBookmarkStatistic(
        @Param('id', new ValidateMangaIdPipe()) id: number,
    ): Promise<BookmarkStatisticType> {
        return await this.mangaStatisticService.getBookmarkStatistic(id);
    }
}
