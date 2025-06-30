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
import { QuickSearchControllerInterface } from '../__common/interfaces/quickSearchController';
import {
    AuthInterceptor,
    AuthUserRequest,
    JwtAuthGuard,
    OptionalAuthUserRequest,
} from 'src/modules/user/auth';
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { DeleteQuickSearchLastDto } from '../__common/dto/deleteQuickSearchLast.dto';
import { QuickSearchQuery } from '../__common/dto/quickSearchQuery.dto';
import { QuickSearchLastList } from '../__common/dto/quickSearchLastList.dto';
import { ApiCustomUnauthorizedResponse } from 'src/shared/decorators/api40xResponses';
import { QuickSearchRanobeList } from './dto/quickSearchRanobe.dto';
import { QuickSearchRanobeService } from './quickSearchRanobe.service';

@Controller('quick-search/ranobe')
export class QuickSearchRanobeController implements QuickSearchControllerInterface {
    constructor(private service: QuickSearchRanobeService) {}

    @Get()
    @ApiOkResponse({
        type: QuickSearchRanobeList,
    })
    @ApiOperation({ summary: 'Optional auth endpoint' })
    @ApiBearerAuth()
    @UseInterceptors(AuthInterceptor)
    async getBooks(
        @Req() req: OptionalAuthUserRequest,
        @Query() query: QuickSearchQuery,
    ): Promise<QuickSearchRanobeList> {
        const userId = req.user && req.user.id;
        return await this.service.getBooks(query, userId);
    }

    @Get('last')
    @ApiBearerAuth()
    @ApiOkResponse({
        type: QuickSearchLastList,
    })
    @ApiCustomUnauthorizedResponse()
    @UseGuards(JwtAuthGuard)
    async getUserLastQueries(@Req() req: AuthUserRequest): Promise<QuickSearchLastList> {
        return await this.service.getUserLastQueries(req.user.id);
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
