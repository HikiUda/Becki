import { Body, Controller, Delete, Get, Param, Patch, Req, UseGuards } from '@nestjs/common';
import { AuthUserRequest, JwtAuthGuard } from 'src/modules/user/auth';
import { ApiBearerAuth, ApiOkResponse, ApiResponse } from '@nestjs/swagger';
import { ApiCustomUnauthorizedResponse } from 'src/shared/decorators/api40xResponses';
import { BookBookmarksControllerInterface } from '../__common/interfaces/bookmarkController';
import { MangaBookmarksService } from './mangaBookmarks.service';
import { MangaIdParam } from '../../_common/model/bookId';
import { AddMangaBookmarkDto } from '../__common/dto/addBookBookmark.dto';
import { UserBookBookmark } from '../__common/dto/userBookBookmark.dto';

@ApiBearerAuth()
@ApiCustomUnauthorizedResponse()
@UseGuards(JwtAuthGuard)
@Controller('manga/:mangaId/bookmark')
export class MangaBookmarksController implements BookBookmarksControllerInterface {
    constructor(private service: MangaBookmarksService) {}

    @Get()
    @ApiOkResponse({ type: UserBookBookmark })
    async getBookmark(
        @Req() req: AuthUserRequest,
        @Param() params: MangaIdParam,
    ): Promise<UserBookBookmark> {
        return await this.service.getBookmark(params.mangaId, req.user.id);
    }

    @Patch()
    @ApiResponse({ status: 204 })
    async setBookmark(
        @Req() req: AuthUserRequest,
        @Param() params: MangaIdParam,
        @Body() body: AddMangaBookmarkDto,
    ): Promise<void> {
        await this.service.setBookmark(params.mangaId, req.user.id, body);
        return;
    }

    @Delete()
    @ApiResponse({ status: 204 })
    async deleteBookmark(
        @Req() req: AuthUserRequest,
        @Param() params: MangaIdParam,
    ): Promise<void> {
        await this.service.deleteBookmark(params.mangaId, req.user.id);
        return;
    }
}
