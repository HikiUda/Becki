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
import { QuickSearchMangaService } from './quickSearchManga.service';
import { QuickSearchControllerInterface } from '../__common/interfaces/quickSearchController';
import {
    AuthInterceptor,
    AuthUserRequest,
    JwtAuthGuard,
    OptionalAuthUserRequest,
} from 'src/modules/user/auth';
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ResponseArrayData } from 'src/shared/types/pagination';
import { DeleteQuickSearchLastDto } from '../__common/dto/deleteQuickSearchLast.dto';
import { QuickSearchQueryDto } from '../__common/dto/quickSearchQuery.dto';
import { QuickSearchLastDto } from '../__common/dto/quickSearchLast.dto';
import { ApiCustomUnauthorizedResponse } from 'src/shared/decorators/api40xResponses';
import { QuickSearchMangaListDto } from './dto/quickSearchManga';

@Controller('quick-search/manga')
export class QuickSearchMangaController
    implements QuickSearchControllerInterface<QuickSearchMangaListDto>
{
    constructor(private service: QuickSearchMangaService) {}

    @Get()
    @ApiOkResponse({
        type: QuickSearchMangaListDto,
    })
    @ApiOperation({ summary: 'Optional auth endpoint' })
    @ApiBearerAuth()
    @UseInterceptors(AuthInterceptor)
    async getBooks(
        @Req() req: OptionalAuthUserRequest,
        @Query() query: QuickSearchQueryDto,
    ): Promise<QuickSearchMangaListDto> {
        const userId = req.user && req.user.id;
        const data = await this.service.getBooks(query, userId);
        return { data };
    }

    @Get('last')
    @ApiBearerAuth()
    @ApiOkResponse({
        type: QuickSearchLastDto,
    })
    @ApiCustomUnauthorizedResponse()
    @UseGuards(JwtAuthGuard)
    async getUserLastQueries(@Req() req: AuthUserRequest): Promise<ResponseArrayData<string>> {
        const data = await this.service.getUserLastQueries(req.user.id);
        return { data };
    }

    @Delete('last')
    @ApiBearerAuth()
    @ApiResponse({ status: 204 })
    @ApiCustomUnauthorizedResponse()
    @UseGuards(JwtAuthGuard)
    async deleteUserLastQuery(
        @Req() req: AuthUserRequest,
        @Body() body: DeleteQuickSearchLastDto,
    ): Promise<void> {
        await this.service.deleteUserLastQuery(body.search, req.user.id);
        return;
    }
}
