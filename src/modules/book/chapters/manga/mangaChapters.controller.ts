import { Controller, Get, Param, Query, Req, UseInterceptors } from '@nestjs/common';
import { AuthInterceptor, OptionalAuthUserRequest } from 'src/modules/user/auth';
import { ApiBearerAuth, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { BookChaptersControllerInterface } from '../__common/interfaces/bookChapterController';
import { MangaChaptersService } from './mangaChapters.service';
import { BookChapterList } from '../__common/dto/bookChapterList.dto';
import { MangaChapterParams, MangaIdParam } from '../../_common/model/bookId';
import { BookChapterListQuery } from '../__common/dto/bookChapterListQuery.dto';
import { BookChapter } from '../__common/dto/bookChapter.dto';
import { PublicMangaChapterPages } from '../../_common/model/mangaChapterPages';
import { ApiCustomNotFoundResponse } from 'src/shared/decorators/api40xResponses';

@Controller('manga/:mangaId/chapters')
export class MangaChaptersController implements BookChaptersControllerInterface {
    constructor(private service: MangaChaptersService) {}

    @Get()
    @ApiOkResponse({ type: BookChapterList })
    @ApiBearerAuth()
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
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Optional auth endpoint' })
    @UseInterceptors(AuthInterceptor)
    async getChapter(
        @Req() req: OptionalAuthUserRequest,
        @Param() params: MangaChapterParams,
    ): Promise<BookChapter> {
        return await this.service.getChapter(params, req.user?.id);
    }

    @Get(':chapterId/pages')
    @ApiOkResponse({ type: PublicMangaChapterPages })
    @ApiCustomNotFoundResponse()
    async getPages(@Param() params: MangaChapterParams): Promise<PublicMangaChapterPages> {
        return await this.service.getPages(params);
    }
}
