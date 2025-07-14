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
import { ContinueReadMangaService } from './continueReadManga.service';
import {
    AuthInterceptor,
    AuthUserRequest,
    AuthGuard,
    OptionalAuthUserRequest,
} from 'src/modules/authorization';
import { ApiCustomUnauthorizedResponse } from 'src/shared/decorators/api40xResponses';
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ContinueReadBookControllerInterface } from '../__common/interfaces/continueReadBookController';
import { ContinueReadBook } from '../__common/dto/continueReadBook.dto';
import {
    ContinueReadBookListQuery,
    ContinueReadBookList,
} from '../__common/dto/continueReadBookList.dto';
import { MangaIdParam } from '../../_common/model/bookId';
import { SetContinueReadMangaParams } from '../__common/dto/setContinueReadBookParams';

@ApiBearerAuth()
@ApiCustomUnauthorizedResponse()
@Controller('continue-read/manga')
export class ContinueReadMangaController implements ContinueReadBookControllerInterface {
    constructor(private service: ContinueReadMangaService) {}

    @Get()
    @ApiOkResponse({ type: ContinueReadBookList })
    @UseGuards(AuthGuard)
    async getContinueReadBookList(
        @Req() req: AuthUserRequest,
        @Query() query: ContinueReadBookListQuery,
    ): Promise<ContinueReadBookList> {
        return await this.service.getContinueReadBookList(req.user.id, query);
    }

    @Get(':mangaId')
    @ApiOkResponse({ type: ContinueReadBook })
    @ApiOperation({ summary: 'Optional auth endpoint' })
    @UseInterceptors(AuthInterceptor)
    async getContinueReadBook(
        @Req() req: OptionalAuthUserRequest,
        @Param() params: MangaIdParam,
    ): Promise<ContinueReadBook> {
        return await this.service.getContinueReadBook(req.user && req.user.id, params.mangaId);
    }

    @Patch(':mangaId/:chapterId')
    @ApiResponse({ status: 204 })
    @UseGuards(AuthGuard)
    async setContinueReadBook(
        @Req() req: AuthUserRequest,
        @Param() params: SetContinueReadMangaParams,
    ): Promise<void> {
        await this.service.setContinueReadBook(req.user.id, params);
        return;
    }

    @Delete(':mangaId')
    @ApiResponse({ status: 204 })
    @UseGuards(AuthGuard)
    async dontShowContinueReadBook(
        @Req() req: AuthUserRequest,
        @Param() params: MangaIdParam,
    ): Promise<void> {
        await this.service.dontShowContinueReadBook(req.user.id, params.mangaId);
    }
}
