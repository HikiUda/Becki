import { Body, Controller, Delete, Get, Param, Patch, Req, UseGuards } from '@nestjs/common';
import { AuthUserRequest, JwtAuthGuard } from 'src/modules/user/auth';
import { ApiBearerAuth, ApiOkResponse, ApiResponse } from '@nestjs/swagger';
import { ApiCustomUnauthorizedResponse } from 'src/shared/decorators/api40xResponses';
import { BookBookmarksControllerInterface } from '../__common/interfaces/bookmarkController';
import { RanobeBookmarksService } from './ranobeBookmarks.service';
import { RanobeIdParam } from '../../_common/model/bookId';
import { AddRanobeBookmarkDto } from '../__common/dto/addBookBookmark.dto';
import { UserBookBookmark } from '../__common/dto/userBookBookmark.dto';

@ApiBearerAuth()
@ApiCustomUnauthorizedResponse()
@UseGuards(JwtAuthGuard)
@Controller('ranobe/:ranobeId/bookmark')
export class RanobeBookmarksController implements BookBookmarksControllerInterface {
    constructor(private service: RanobeBookmarksService) {}

    @Get()
    @ApiOkResponse({ type: UserBookBookmark })
    async getBookmark(
        @Req() req: AuthUserRequest,
        @Param() params: RanobeIdParam,
    ): Promise<UserBookBookmark> {
        return await this.service.getBookmark(params.ranobeId, req.user.id);
    }

    @Patch()
    @ApiResponse({ status: 204 })
    async setBookmark(
        @Req() req: AuthUserRequest,
        @Param() params: RanobeIdParam,
        @Body() body: AddRanobeBookmarkDto,
    ): Promise<void> {
        await this.service.setBookmark(params.ranobeId, req.user.id, body);
        return;
    }

    @Delete()
    @ApiResponse({ status: 204 })
    async deleteBookmark(
        @Req() req: AuthUserRequest,
        @Param() params: RanobeIdParam,
    ): Promise<void> {
        await this.service.deleteBookmark(params.ranobeId, req.user.id);
        return;
    }
}
