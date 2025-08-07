import { BookIdParam } from 'src/modules/book/_common/model/bookId';
import { CommentList } from '../dto/comment.dto';
import { GetRootCommentsQuery } from '../dto/getRootCommentsQuery';
import { GetRepliesCommentsQuery } from '../dto/getRepliesCommentsQuery';
import { BookCommentIdParam } from '../dto/bookCommentId';
import { AddCommentDto, UpdateCommentDto } from '../dto/mutateComment.dto';
import { AuthUserRequest } from 'src/modules/authorization';

export interface BookCommentsControllerInterface {
    getRootComments: (params: BookIdParam, query: GetRootCommentsQuery) => Promise<CommentList>;
    getRepliesComments: (
        params: BookCommentIdParam,
        query: GetRepliesCommentsQuery,
    ) => Promise<CommentList>;
    addComment: (req: AuthUserRequest, params: BookIdParam, data: AddCommentDto) => Promise<void>;
    updateComment: (
        req: AuthUserRequest,
        params: BookCommentIdParam,
        data: UpdateCommentDto,
    ) => Promise<void>;
    deleteComment: (req: AuthUserRequest, params: BookCommentIdParam) => Promise<void>;
}
