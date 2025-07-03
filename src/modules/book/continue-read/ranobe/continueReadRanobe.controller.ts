import {
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Query,
    Req,
    UseGuards,
    UseInterceptors,
} from '@nestjs/common';
import {
    AuthInterceptor,
    AuthUserRequest,
    JwtAuthGuard,
    OptionalAuthUserRequest,
} from 'src/modules/user/auth';
import { ApiCustomUnauthorizedResponse } from 'src/shared/decorators/api40xResponses';
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ContinueReadBookControllerInterface } from '../__common/interfaces/continueReadBookController';
import { ContinueReadBook } from '../__common/dto/continueReadBook.dto';
import {
    ContinueReadBookListQuery,
    ContinueReadBookList,
} from '../__common/dto/continueReadBookList.dto';
import { RanobeIdParam } from '../../_common/model/bookId';
import { SetContinueReadRanobeParams } from '../__common/dto/setContinueReadBookParams';
import { ContinueReadRanobeService } from './continueReadRanobe.service';

@ApiBearerAuth()
@ApiCustomUnauthorizedResponse()
@Controller('continue-read/ranobe')
export class ContinueReadRanobeController implements ContinueReadBookControllerInterface {
    constructor(private service: ContinueReadRanobeService) {}

    @Get()
    @ApiOkResponse({ type: ContinueReadBookList })
    @UseGuards(JwtAuthGuard)
    async getContinueReadBookList(
        @Req() req: AuthUserRequest,
        @Query() query: ContinueReadBookListQuery,
    ): Promise<ContinueReadBookList> {
        return await this.service.getContinueReadBookList(req.user.id, query);
    }

    @Get(':ranobeId')
    @ApiOkResponse({ type: ContinueReadBook })
    @ApiOperation({ summary: 'Optional auth endpoint' })
    @UseInterceptors(AuthInterceptor)
    async getContinueReadBook(
        @Req() req: OptionalAuthUserRequest,
        @Param() params: RanobeIdParam,
    ): Promise<ContinueReadBook> {
        return await this.service.getContinueReadBook(req.user && req.user.id, params.ranobeId);
    }

    @Patch(':ranobeId/:chapterId')
    @ApiResponse({ status: 204 })
    @UseGuards(JwtAuthGuard)
    async setContinueReadBook(
        @Req() req: AuthUserRequest,
        @Param() params: SetContinueReadRanobeParams,
    ): Promise<void> {
        await this.service.setContinueReadBook(req.user.id, params);
        return;
    }

    @Delete(':ranobeId')
    @ApiResponse({ status: 204 })
    @UseGuards(JwtAuthGuard)
    async dontShowContinueReadBook(
        @Req() req: AuthUserRequest,
        @Param() params: RanobeIdParam,
    ): Promise<void> {
        await this.service.dontShowContinueReadBook(req.user.id, params.ranobeId);
    }
}
