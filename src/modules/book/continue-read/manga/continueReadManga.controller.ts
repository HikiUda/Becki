import {
    Controller,
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
    JwtAuthGuard,
    OptionalAuthUserRequest,
} from 'src/modules/user/auth';
import { ApiCustomUnauthorizedResponse } from 'src/shared/decorators/api40xResponses';
import { ApiBearerAuth } from '@nestjs/swagger';
import { ContinueReadBookControllerInterface } from '../__common/interfaces/continueReadBookController';
import { ContinueReadBook } from '../__common/dto/continueReadBook.dto';
import {
    ContinueReadBookListQuery,
    ContinueReadBookList,
} from '../__common/dto/continueReadBookList.dto';
import { ValidateBookIdPipe } from '../../_common/pipes/validateBookIdPipe';

@ApiBearerAuth()
@ApiCustomUnauthorizedResponse()
@Controller('continue-read/manga')
export class ContinueReadMangaController implements ContinueReadBookControllerInterface {
    constructor(private service: ContinueReadMangaService) {}

    @Get()
    @UseGuards(JwtAuthGuard)
    async getContinueReadManga(
        @Req() req: AuthUserRequest,
        @Query() query: ContinueReadBookListQuery,
    ): Promise<ContinueReadBookList> {
        return await this.service.getContinueReadBookList(req.user.id, query);
    }

    @Get(':mangaId')
    @UseInterceptors(AuthInterceptor)
    async getContinueReadBook(
        @Req() req: OptionalAuthUserRequest,
        @Param('mangaId', new ValidateBookIdPipe()) bookId: number,
    ): Promise<ContinueReadBook> {
        return await this.service.getContinueReadBook(req.user && req.user.id, bookId);
    }

    async setContinueReadBook(
        req: AuthUserRequest,
        bookId: number,
        chapterId: number | null,
    ): Promise<void> {}

    async dontShowContinueReadManga(req: AuthUserRequest, bookId: number): Promise<void> {}
}
