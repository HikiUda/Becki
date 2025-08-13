import { Comment, CommentUser } from '../dto/comment.dto';
import { GetComments } from './getComments';

export function toComments(comments: GetComments): Comment[] {
    return comments.map((comment) => {
        const { user, isDeleted, _count, ...data } = comment;
        const hasChildrens = !!_count.children;
        if (isDeleted) {
            return {
                ...data,
                userId: null,
                content: 'Этот комментарий был удален.',
                hasChildrens,
            };
        }
        return { ...data, hasChildrens };
    });
}

export function toCommentsUsers(comments: GetComments): CommentUser[] {
    return comments.map((comment) => {
        const { user } = comment;
        return user;
    });
}
