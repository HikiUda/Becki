import { Controller, Get, Param, Patch, Req, UseGuards, UseInterceptors } from '@nestjs/common';
import {
    AuthInterceptor,
    AuthUserRequest,
    AuthGuard,
    OptionalAuthUserRequest,
} from 'src/modules/authorization';
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { RanobeChapterParams } from '../../_common/model/bookId';
import { UserLikeBookChapterDto } from '../__common/dto/userLikeBookChapter.dto';
import {
    ApiCustomBadRequestResponse,
    ApiCustomUnauthorizedResponse,
} from 'src/shared/decorators/api40xResponses';
import { UserBookChapterActionsControllerInterface } from '../__common/interfaces/userBookChapterActionsController';
import { UserRanobeChapterActionsService } from './userRanobeChapterActions.service';

@ApiBearerAuth()
@Controller('ranobe/:ranobeId/chapters/:chapterId')
export class UserRanobeChapterActionsController
    implements UserBookChapterActionsControllerInterface
{
    constructor(private service: UserRanobeChapterActionsService) {}

    @Patch('view')
    @ApiResponse({ status: 204 })
    @ApiCustomBadRequestResponse()
    @ApiCustomUnauthorizedResponse()
    @UseGuards(AuthGuard)
    async addUserViewChapter(
        @Req() req: AuthUserRequest,
        @Param() params: RanobeChapterParams,
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
        @Param() params: RanobeChapterParams,
    ): Promise<UserLikeBookChapterDto> {
        return await this.service.getUserLikeChapter(params, req.user?.id);
    }

    @Patch('like')
    @ApiResponse({ status: 204 })
    @ApiCustomUnauthorizedResponse()
    @UseGuards(AuthGuard)
    async setUserLikeChapter(
        @Req() req: AuthUserRequest,
        @Param() params: RanobeChapterParams,
    ): Promise<void> {
        await this.service.setUserLikeChapter(params, req.user.id);
        return;
    }
}
