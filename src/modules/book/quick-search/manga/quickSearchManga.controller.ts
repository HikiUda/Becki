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
    AuthGuard,
    OptionalAuthUserRequest,
} from 'src/modules/authorization';
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { DeleteQuickSearchLastDto } from '../__common/dto/deleteQuickSearchLast.dto';
import { QuickSearchQuery } from '../__common/dto/quickSearchQuery.dto';
import { QuickSearchLastList } from '../__common/dto/quickSearchLastList.dto';
import { ApiCustomUnauthorizedResponse } from 'src/shared/decorators/api40xResponses';
import { QuickSearchMangaList } from './dto/quickSearchManga.dto';

@Controller('quick-search/manga')
export class QuickSearchMangaController implements QuickSearchControllerInterface {
    constructor(private service: QuickSearchMangaService) {}

    @Get()
    @ApiOkResponse({
        type: QuickSearchMangaList,
    })
    @ApiOperation({ summary: 'Optional auth endpoint' })
    @ApiBearerAuth()
    @UseInterceptors(AuthInterceptor)
    async getBooks(
        @Req() req: OptionalAuthUserRequest,
        @Query() query: QuickSearchQuery,
    ): Promise<QuickSearchMangaList> {
        const userId = req.user && req.user.id;
        return await this.service.getBooks(query, userId);
    }

    @Get('last')
    @ApiBearerAuth()
    @ApiOkResponse({
        type: QuickSearchLastList,
    })
    @ApiCustomUnauthorizedResponse()
    @UseGuards(AuthGuard)
    async getUserLastQueries(@Req() req: AuthUserRequest): Promise<QuickSearchLastList> {
        return await this.service.getUserLastQueries(req.user.id);
    }

    @Delete('last')
    @ApiBearerAuth()
    @ApiResponse({ status: 204 })
    @ApiCustomUnauthorizedResponse()
    @UseGuards(AuthGuard)
    async deleteUserLastQuery(
        @Req() req: AuthUserRequest,
        @Body() body: DeleteQuickSearchLastDto,
    ): Promise<void> {
        await this.service.deleteUserLastQuery(body.search, req.user.id);
        return;
    }
}
