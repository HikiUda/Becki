import { Controller, Param, Patch, Req, UseGuards } from '@nestjs/common';
import { ChapterActionControllerInterface } from './interfaces/chapterActionController';
import { ChapterActionService } from './chapterAction.service';
import { ValidateMangaIdPipe } from 'src/modules/manga/common/pipes/ValidateMangaIdPipe';
import { AuthUserRequest, JwtAuthGuard } from 'src/modules/user/auth';
import { ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { ApiCustomUnauthorizedResponse } from 'src/common/decorators/api40xResponses';

@Controller('manga/chapter/:id')
@ApiBearerAuth()
@ApiCustomUnauthorizedResponse()
@UseGuards(JwtAuthGuard)
export class ChapterActionController implements ChapterActionControllerInterface {
    constructor(private chapterActionService: ChapterActionService) {}
    @Patch('like')
    @ApiResponse({ status: 204 })
    async setUserLikeChapter(
        @Param('id', new ValidateMangaIdPipe()) chapterId: number,
        @Req() req: AuthUserRequest,
    ): Promise<void> {
        await this.chapterActionService.setUserLikeChapter(chapterId, req.user.id);
    }
    @Patch('view')
    @ApiResponse({ status: 204 })
    async setUserViewChapter(
        @Param('id', new ValidateMangaIdPipe()) chapterId: number,
        @Req() req: AuthUserRequest,
    ): Promise<void> {
        await this.chapterActionService.setUserViewChapter(chapterId, req.user.id);
    }
}
