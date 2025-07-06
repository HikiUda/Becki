import { Controller, Get, Param, Query, Req, UseInterceptors } from '@nestjs/common';
import { AuthInterceptor, OptionalAuthUserRequest } from 'src/modules/user/auth';
import { ApiBearerAuth, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { BookChaptersControllerInterface } from '../__common/interfaces/bookChapterController';
import { MangaChaptersService } from './mangaChapters.service';
import { BookChapterList } from '../__common/dto/bookChapterList.dto';
import { MangaChapterParams, MangaIdParam } from '../../_common/model/bookId';
import { BookChapterListQuery } from '../__common/dto/bookChapterListQuery.dto';
import { BookChapter } from '../__common/dto/bookChapter.dto';
import { LangQuery } from 'src/shared/dto/langQuery.dto';

@ApiBearerAuth()
@Controller('manga/:mangaId/chapters')
export class MangaChaptersController implements BookChaptersControllerInterface {
    constructor(private service: MangaChaptersService) {}

    @Get()
    @ApiOkResponse({ type: BookChapterList })
    @ApiOperation({ summary: 'Optional auth endpoint' })
    @UseInterceptors(AuthInterceptor)
    async getChapterList(
        @Req() req: OptionalAuthUserRequest,
        @Param() params: MangaIdParam,
        @Query() query: BookChapterListQuery,
    ): Promise<BookChapterList> {
        return await this.service.getChapterList(params.mangaId, query, req.user?.id);
    }

    @Get(':chapterId')
    @ApiOkResponse({ type: BookChapter })
    @ApiOperation({ summary: 'Optional auth endpoint' })
    @UseInterceptors(AuthInterceptor)
    async getChapter(
        @Req() req: OptionalAuthUserRequest,
        @Param() params: MangaChapterParams,
        @Query() query: LangQuery,
    ): Promise<BookChapter> {
        return await this.service.getChapter(params, query.lang, req.user?.id);
    }
}
