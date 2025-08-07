import { BookId } from 'src/modules/book/_common/model/bookId';
import { CommentList } from '../dto/comment.dto';
import { BookCommentIdParam } from '../dto/bookCommentId';
import { GetRootCommentsQuery } from '../dto/getRootCommentsQuery';
import { GetRepliesCommentsQuery } from '../dto/getRepliesCommentsQuery';
import { AddCommentDto, UpdateCommentDto } from '../dto/mutateComment.dto';
import { UserId } from 'src/modules/authorization';

export interface BookCommentsServiceInterface {
    getRootComments: (bookId: BookId, query: GetRootCommentsQuery) => Promise<CommentList>;
    getRepliesComments: (
        params: BookCommentIdParam,
        query: GetRepliesCommentsQuery,
    ) => Promise<CommentList>;
    addComment: (bookId: BookId, data: AddCommentDto, userId: UserId) => Promise<void>;
    updateComment: (params: BookCommentIdParam, data: UpdateCommentDto) => Promise<void>;
    deleteComment: (params: BookCommentIdParam) => Promise<void>;
}
