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
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ResponseArrayData } from 'src/common/types/pagination';
import { DeleteSearchDto } from './dto/deleteSearchDto';
import { QuickSearchQueryDto } from './dto/QuickSearchQueryDto';
import { QuickSearchLastDto } from './dto/quickSearchLast.dto';
import { ApiCustomUnauthorizedResponse } from 'src/common/decorators/api40xResponses';

@Controller('manga/quick-search')
export class QuickSearchController implements QuickSearchControllerInterface {
    constructor(private quickSearchService: QuickSearchService) {}

    @Get()
    @ApiOkResponse({
        type: MangaListItemStatisticResponseArrayData,
    })
    @ApiOperation({ summary: 'Optional auth endpoint' })
    @ApiBearerAuth()
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
    @ApiBearerAuth()
    @ApiOkResponse({
        type: QuickSearchLastDto,
    })
    @ApiCustomUnauthorizedResponse()
    @UseGuards(JwtAuthGuard)
    async getUserLastSearchQueries(
        @Req() req: AuthUserRequest,
    ): Promise<ResponseArrayData<string>> {
        const data = await this.quickSearchService.getUserLastSearchQueries(req.user.id);
        return { data };
    }

    @Delete('last')
    @ApiBearerAuth()
    @ApiResponse({ status: 204 })
    @ApiCustomUnauthorizedResponse()
    @UseGuards(JwtAuthGuard)
    async deleteUserLastSearchQuery(
        @Req() req: AuthUserRequest,
        @Body() body: DeleteSearchDto,
    ): Promise<void> {
        await this.quickSearchService.deleteUserLastSearchQuery(body.search, req.user.id);
    }
}
