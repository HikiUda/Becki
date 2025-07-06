import { Controller, Get, Param, Patch, Req, UseGuards, UseInterceptors } from '@nestjs/common';
import {
    AuthInterceptor,
    AuthUserRequest,
    JwtAuthGuard,
    OptionalAuthUserRequest,
} from 'src/modules/user/auth';
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UserMangaChapterActionsService } from './userMangaChapterActions.service';
import { MangaChapterParams } from '../../_common/model/bookId';
import { UserLikeBookChapterDto } from '../__common/dto/userLikeBookChapter.dto';
import {
    ApiCustomBadRequestResponse,
    ApiCustomUnauthorizedResponse,
} from 'src/shared/decorators/api40xResponses';
import { UserBookChapterActionsControllerInterface } from '../__common/interfaces/userBookChapterActionsController';

@ApiBearerAuth()
@Controller('manga/:mangaId/chapters/:chapterId')
export class UserMangaChapterActionsController
    implements UserBookChapterActionsControllerInterface
{
    constructor(private service: UserMangaChapterActionsService) {}

    @Patch('view')
    @ApiResponse({ status: 204 })
    @ApiCustomBadRequestResponse()
    @ApiCustomUnauthorizedResponse()
    @UseGuards(JwtAuthGuard)
    async addUserViewChapter(
        @Req() req: AuthUserRequest,
        @Param() params: MangaChapterParams,
    ): Promise<void> {
        await this.service.addUserViewChapter(params, req.user.id);
        return;
    }

    @Get('like')
    @ApiOkResponse({ type: UserLikeBookChapterDto })
    @ApiOperation({ summary: 'Optional auth endpoint' })
    @UseInterceptors(AuthInterceptor)
    async getUserLikeChapter(
        @Req() req: OptionalAuthUserRequest,
        @Param() params: MangaChapterParams,
    ): Promise<UserLikeBookChapterDto> {
        return await this.service.getUserLikeChapter(params, req.user?.id);
    }

    @Patch('like')
    @ApiResponse({ status: 204 })
    @ApiCustomUnauthorizedResponse()
    @UseGuards(JwtAuthGuard)
    async setUserLikeChapter(
        @Req() req: AuthUserRequest,
        @Param() params: MangaChapterParams,
    ): Promise<void> {
        await this.service.setUserLikeChapter(params, req.user.id);
        return;
    }
}
