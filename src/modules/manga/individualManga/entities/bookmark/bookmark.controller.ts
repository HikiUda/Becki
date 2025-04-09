import { Body, Controller, Delete, Get, Param, Patch, Req, UseGuards } from '@nestjs/common';
import { BookmarkControllerInterface } from './interfaces/bookmarkController';
import { BookmarkService } from './bookmark.service';
import { AuthUserRequest, JwtAuthGuard } from 'src/modules/user/auth';
import { UserMangaBookmarkDto } from './dto/userMangaBookmark.dto';
import { ValidateMangaIdPipe } from 'src/modules/manga/common/pipes/ValidateMangaIdPipe';
import { BookmarkDto } from 'src/common/dto/manga/bookmarks.dto';
import { ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { mockUserMangaBookmark } from './mock/bookmark';
import { ApiMangaIdParam } from 'src/modules/manga/common/decorators/ApiMangaIdParam/ApiMangaIdParam';

@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@ApiMangaIdParam()
@Controller('manga/byId/:id/bookmark')
export class BookmarkController implements BookmarkControllerInterface {
    constructor(private bookmarkService: BookmarkService) {}

    @Get()
    @ApiResponse({ example: mockUserMangaBookmark })
    async getUserMangaBookmark(
        @Param('id', new ValidateMangaIdPipe()) mangaId: number,
        @Req() req: AuthUserRequest,
    ): Promise<UserMangaBookmarkDto> {
        return await this.bookmarkService.getUserMangaBookmark(mangaId, req.user.id);
    }

    @Patch()
    @ApiResponse({ example: mockUserMangaBookmark })
    async setUserMangaBookmark(
        @Param('id', new ValidateMangaIdPipe()) mangaId: number,
        @Req() req: AuthUserRequest,
        @Body() body: BookmarkDto,
    ): Promise<UserMangaBookmarkDto> {
        return await this.bookmarkService.setUserMangaBookmark(mangaId, req.user.id, body.bookmark);
    }
    @Delete()
    async deleteUserMangaBookmark(
        @Param('id', new ValidateMangaIdPipe()) mangaId: number,
        @Req() req: AuthUserRequest,
    ): Promise<void> {
        await this.bookmarkService.deleteUserMangaBookmark(mangaId, req.user.id);
    }
}
