import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    Query,
    Req,
    UseGuards,
} from '@nestjs/common';
import { BookCommentsControllerInterface } from '../__common/interfaces/bookCommentsController';
import { MangaCommentsService } from './mangaComments.service';
import { BookIdParam, MangaIdParam } from '../../_common/model/bookId';
import { CommentList } from '../__common/dto/comment.dto';
import { GetRootCommentsQuery } from '../__common/dto/getRootCommentsQuery';
import { ApiOkResponse, ApiResponse } from '@nestjs/swagger';
import { BookCommentIdParam, MangaCommentIdParam } from '../__common/dto/bookCommentId';
import { GetRepliesCommentsQuery } from '../__common/dto/getRepliesCommentsQuery';
import { AuthGuard, AuthUserRequest } from 'src/modules/authorization';
import { AddCommentDto, UpdateCommentDto } from '../__common/dto/mutateComment.dto';

@Controller('manga/:mangaId/comments')
export class MangaCommentsController implements BookCommentsControllerInterface {
    constructor(private service: MangaCommentsService) {}

    @Get()
    @ApiOkResponse({ type: CommentList })
    async getRootComments(
        @Param() params: MangaIdParam,
        @Query() query: GetRootCommentsQuery,
    ): Promise<CommentList> {
        return await this.service.getRootComments(params.mangaId, query);
    }

    @Get(':commentId/replies')
    @ApiOkResponse({ type: CommentList })
    async getRepliesComments(
        @Param() params: MangaCommentIdParam,
        @Query() query: GetRepliesCommentsQuery,
    ): Promise<CommentList> {
        return await this.service.getRepliesComments(params, query);
    }

    @Post()
    @ApiResponse({ status: 204 })
    @UseGuards(AuthGuard)
    async addComment(
        @Req() req: AuthUserRequest,
        @Param() params: MangaIdParam,
        @Body() data: AddCommentDto,
    ): Promise<void> {
        await this.service.addComment(params.mangaId, data, req.user.id);
        return;
    }

    @Patch(':commentId')
    @ApiResponse({ status: 204 })
    @UseGuards(AuthGuard)
    async updateComment(
        @Req() req: AuthUserRequest,
        @Param() params: MangaCommentIdParam,
        @Body() data: UpdateCommentDto,
    ): Promise<void> {
        await this.service.updateComment(params, data);
        return;
    }

    @Delete(':commentId')
    @ApiResponse({ status: 204 })
    @UseGuards(AuthGuard)
    async deleteComment(
        @Req() req: AuthUserRequest,
        @Param() params: MangaCommentIdParam,
    ): Promise<void> {
        await this.service.deleteComment(params);
        return;
    }
}
