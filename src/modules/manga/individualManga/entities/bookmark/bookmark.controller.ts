import { Body, Controller, Delete, Get, Param, Patch, Req, UseGuards } from '@nestjs/common';
import { BookmarkControllerInterface } from './interfaces/bookmarkController';
import { BookmarkService } from './bookmark.service';
import { AuthUserRequest, JwtAuthGuard } from 'src/modules/user/auth';
import { UserMangaBookmarkDto } from './dto/userMangaBookmark.dto';
import { ValidateMangaIdPipe } from 'src/modules/manga/common/pipes/ValidateMangaIdPipe';
import { BookmarkDto } from 'src/shared/dto/manga/bookmarks.dto';
import { ApiBearerAuth, ApiOkResponse, ApiResponse } from '@nestjs/swagger';
import { ApiMangaIdParam } from 'src/modules/manga/common/decorators/ApiMangaIdParam/ApiMangaIdParam';
import { ApiCustomUnauthorizedResponse } from 'src/shared/decorators/api40xResponses';

@ApiBearerAuth()
@ApiMangaIdParam()
@ApiCustomUnauthorizedResponse()
@UseGuards(JwtAuthGuard)
@Controller('manga/byId/:id/bookmark')
export class BookmarkController implements BookmarkControllerInterface {
    constructor(private bookmarkService: BookmarkService) {}

    @Get()
    @ApiOkResponse({ type: UserMangaBookmarkDto })
    async getUserMangaBookmark(
        @Param('id', new ValidateMangaIdPipe()) mangaId: number,
        @Req() req: AuthUserRequest,
    ): Promise<UserMangaBookmarkDto> {
        return await this.bookmarkService.getUserMangaBookmark(mangaId, req.user.id);
    }

    @Patch()
    @ApiOkResponse({ type: UserMangaBookmarkDto })
    async setUserMangaBookmark(
        @Param('id', new ValidateMangaIdPipe()) mangaId: number,
        @Req() req: AuthUserRequest,
        @Body() body: BookmarkDto,
    ): Promise<UserMangaBookmarkDto> {
        return await this.bookmarkService.setUserMangaBookmark(mangaId, req.user.id, body.bookmark);
    }
    @Delete()
    @ApiResponse({ status: 204 })
    async deleteUserMangaBookmark(
        @Param('id', new ValidateMangaIdPipe()) mangaId: number,
        @Req() req: AuthUserRequest,
    ): Promise<void> {
        await this.bookmarkService.deleteUserMangaBookmark(mangaId, req.user.id);
    }
}
