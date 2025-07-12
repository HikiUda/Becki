import { Controller, Get, Param, Query, Req, UseInterceptors } from '@nestjs/common';
import { AuthInterceptor, OptionalAuthUserRequest } from 'src/modules/user/auth';
import { ApiBearerAuth, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { BookChaptersControllerInterface } from '../__common/interfaces/bookChapterController';
import { BookChapterList } from '../__common/dto/bookChapterList.dto';
import { BookChapterParams, RanobeChapterParams, RanobeIdParam } from '../../_common/model/bookId';
import { BookChapterListQuery } from '../__common/dto/bookChapterListQuery.dto';
import { BookChapter } from '../__common/dto/bookChapter.dto';
import { RanobeChaptersService } from './ranobeChapters.service';

@ApiBearerAuth()
@Controller('ranobe/:ranobeId/chapters')
export class RanobeChaptersController implements BookChaptersControllerInterface {
    constructor(private service: RanobeChaptersService) {}

    @Get()
    @ApiOkResponse({ type: BookChapterList })
    @ApiOperation({ summary: 'Optional auth endpoint' })
    @UseInterceptors(AuthInterceptor)
    async getChapterList(
        @Req() req: OptionalAuthUserRequest,
        @Param() params: RanobeIdParam,
        @Query() query: BookChapterListQuery,
    ): Promise<BookChapterList> {
        return await this.service.getChapterList(params.ranobeId, query, req.user?.id);
    }

    @Get(':chapterId')
    @ApiOkResponse({ type: BookChapter })
    @ApiOperation({ summary: 'Optional auth endpoint' })
    @UseInterceptors(AuthInterceptor)
    async getChapter(
        @Req() req: OptionalAuthUserRequest,
        @Param() params: RanobeChapterParams,
    ): Promise<BookChapter> {
        return await this.service.getChapter(params, req.user?.id);
    }

    getPages: (params: BookChapterParams) => Promise<any>;
}
