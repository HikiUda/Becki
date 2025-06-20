import { Controller, Get, Param, Query, Req, UseInterceptors } from '@nestjs/common';
import { PublicChapterControllerInterface } from './interfaces/publicChapterController';
import { PublicChapterService } from './publicChapter.service';
import { ChapterListPagination } from './dto/chapterList/chapterListItem.dto';
import { ChapterListQuery } from './dto/chapterList/chapterListQuery';
import { AuthInterceptor, OptionalAuthUserRequest } from 'src/modules/user/auth';
import { ValidateMangaIdPipe } from 'src/modules/manga/common/pipes/ValidateMangaIdPipe';
import { LangQueryDto } from 'src/common/dto/query/langQuery.dto';
import { ChapterDto } from './dto/chapter.dto';
import { ApiBearerAuth, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { MangaIdsType } from 'src/modules/manga/common/types/mangaTypes';
import { ApiMangaIdParam } from 'src/modules/manga/common/decorators/ApiMangaIdParam/ApiMangaIdParam';

@Controller('manga')
export class PublicChapterController implements PublicChapterControllerInterface {
    constructor(private publicChapterService: PublicChapterService) {}

    @Get('chapter/:chapterId')
    @ApiOkResponse({ type: ChapterDto })
    @ApiOperation({ summary: 'Optional auth endpoint' })
    @ApiBearerAuth()
    @ApiMangaIdParam('chapterId')
    @UseInterceptors(AuthInterceptor)
    async getChapter(
        @Param('chapterId', new ValidateMangaIdPipe()) chapterId: number,
        @Query() query: LangQueryDto,
        @Req() req: OptionalAuthUserRequest,
    ): Promise<ChapterDto> {
        return await this.publicChapterService.getChapter(chapterId, query.lang, req.user?.id);
    }

    @Get(':mangaId/chapters')
    @ApiOperation({ summary: 'Optional auth endpoint' })
    @ApiBearerAuth()
    @ApiOkResponse({ type: ChapterListPagination })
    @ApiMangaIdParam('mangaId')
    @UseInterceptors(AuthInterceptor)
    async getChapterList(
        @Param('mangaId', new ValidateMangaIdPipe()) mangaId: number,
        @Query() query: ChapterListQuery,
        @Req() req?: OptionalAuthUserRequest,
    ): Promise<ChapterListPagination> {
        return await this.publicChapterService.getChapterList(mangaId, query, req?.user?.id);
    }
}
