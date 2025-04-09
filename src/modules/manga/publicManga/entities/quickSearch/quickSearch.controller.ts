import {
    Body,
    Controller,
    Delete,
    Get,
    Query,
    Req,
    UseGuards,
    UseInterceptors,
} from '@nestjs/common';
import { QuickSearchService } from './quickSearch.service';
import { QuickSearchControllerInterface } from './interfaces/quickSearchController';
import {
    AuthInterceptor,
    AuthUserRequest,
    JwtAuthGuard,
    OptionalAuthUserRequest,
} from 'src/modules/user/auth';
import { MangaListItemStatisticResponseArrayData } from '../../dto/mangaListItemStatistic.dto';
import { ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { mockMangaListItemStatisticArray } from '../../mock/mockMangaListItemStatistic.dto';
import { ResponseArrayData } from 'src/common/types/pagination';
import { DeleteSearchDto } from './dto/deleteSearchDto';
import { QuickSearchQueryDto } from './dto/QuickSearchQueryDto';

@Controller('manga/quick-search')
export class QuickSearchController implements QuickSearchControllerInterface {
    constructor(private quickSearchService: QuickSearchService) {}

    @Get()
    @ApiResponse({
        example: mockMangaListItemStatisticArray,
        description: 'Automaticly save user search',
    })
    @UseInterceptors(AuthInterceptor)
    async getMangaQuickSearch(
        @Query() query: QuickSearchQueryDto,
        @Req() req: OptionalAuthUserRequest,
    ): Promise<MangaListItemStatisticResponseArrayData> {
        const userId = req.user && req.user.id;
        const data = await this.quickSearchService.getMangaQuickSearch(
            query.search,
            query.lang,
            userId,
        );
        return { data };
    }

    @Get('last')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiResponse({
        example: { data: ['search', 'search2'] },
    })
    async getUserLastSearchQueries(
        @Req() req: AuthUserRequest,
    ): Promise<ResponseArrayData<string>> {
        const data = await this.quickSearchService.getUserLastSearchQueries(req.user.id);
        return { data };
    }

    @Delete('last')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    async deleteUserLastSearchQuery(
        @Req() req: AuthUserRequest,
        @Body() body: DeleteSearchDto,
    ): Promise<void> {
        await this.quickSearchService.deleteUserLastSearchQuery(body.search, req.user.id);
    }
}
