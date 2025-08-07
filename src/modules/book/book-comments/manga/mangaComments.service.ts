import { Injectable } from '@nestjs/common';
import { MangaCommentsRepository } from './mangaComments.repository';
import { BookCommentsServiceInterface } from '../__common/interfaces/bookCommentsService';
import { MangaId } from '../../_common/model/bookId';
import { CommentList } from '../__common/dto/comment.dto';
import { GetRootCommentsQuery } from '../__common/dto/getRootCommentsQuery';
import { MangaCommentIdParam } from '../__common/dto/bookCommentId';
import { GetRepliesCommentsQuery } from '../__common/dto/getRepliesCommentsQuery';
import { UserId } from 'src/modules/authorization';
import { AddCommentDto, UpdateCommentDto } from '../__common/dto/mutateComment.dto';

@Injectable()
export class MangaCommentsService implements BookCommentsServiceInterface {
    constructor(private repository: MangaCommentsRepository) {}

    async getRootComments(bookId: MangaId, query: GetRootCommentsQuery): Promise<CommentList> {
        return await this.repository.getRootComments(bookId, query);
    }
    async getRepliesComments(
        params: MangaCommentIdParam,
        query: GetRepliesCommentsQuery,
    ): Promise<CommentList> {
        return await this.repository.getRepliesComments(params, query);
    }

    async addComment(bookId: MangaId, data: AddCommentDto, userId: UserId): Promise<void> {
        return await this.repository.addComment(bookId, data, userId);
    }

    async updateComment(params: MangaCommentIdParam, data: UpdateCommentDto): Promise<void> {
        return await this.repository.updateComment(params, data);
    }

    async deleteComment(params: MangaCommentIdParam): Promise<void> {
        return await this.repository.deleteComment(params);
    }
}
