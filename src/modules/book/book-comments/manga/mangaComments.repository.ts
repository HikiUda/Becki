import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/prisma/prisma.service';
import { BookCommentsRepositoryInterface } from '../__common/interfaces/bookCommentsRepository';
import { MangaId } from '../../_common/model/bookId';
import { CommentList } from '../__common/dto/comment.dto';
import { GetRootCommentsQuery } from '../__common/dto/getRootCommentsQuery';
import { getCommentsSelect } from '../__common/prisma/getComments';
import { toComments, toCommentsUsers } from '../__common/prisma/toComments';
import { getPagination } from 'src/shared/dto/pagination.dto';
import { MangaCommentIdParam } from '../__common/dto/bookCommentId';
import { GetRepliesCommentsQuery } from '../__common/dto/getRepliesCommentsQuery';
import { AddCommentDto, UpdateCommentDto } from '../__common/dto/mutateComment.dto';
import { UserId } from 'src/modules/authorization';

@Injectable()
export class MangaCommentsRepository implements BookCommentsRepositoryInterface {
    constructor(private prisma: PrismaService) {}

    async getRootComments(bookId: MangaId, query: GetRootCommentsQuery): Promise<CommentList> {
        const [comments, commentsCount] = await Promise.all([
            this.prisma.mangaComments.findMany({
                take: query.limit,
                skip: (query.page - 1) * query.limit,
                where: { bookId, parentId: null, id: query.commentId },
                orderBy: { createdAt: 'desc' },
                select: getCommentsSelect,
            }),
            this.prisma.mangaComments.count({
                where: { bookId, parentId: null, id: query.commentId },
            }),
        ]);

        return {
            data: toComments(comments),
            users: toCommentsUsers(comments),
            ...getPagination(commentsCount, query.page, query.limit),
        };
    }

    async getRepliesComments(
        { mangaId: bookId, commentId }: MangaCommentIdParam,
        { depthLimit, depthStep }: GetRepliesCommentsQuery,
    ): Promise<CommentList> {
        const nestingStart = depthLimit * (depthStep - 1);
        const nestingEnd = depthLimit * depthStep;

        const [comments, commentsCount] = await Promise.all([
            this.prisma.mangaComments.findMany({
                where: {
                    bookId,
                    rootComment: commentId,
                    nestingLevel: { gt: nestingStart, lte: nestingEnd },
                },
                select: getCommentsSelect,
            }),
            this.prisma.mangaComments.count({
                where: { bookId, rootComment: commentId, nestingLevel: { equals: nestingEnd + 1 } },
            }),
        ]);
        return {
            data: toComments(comments),
            users: toCommentsUsers(comments),
            prevPage: depthStep >= 1 ? null : depthStep - 1,
            nextPage: commentsCount ? depthStep + 1 : null,
        };
    }

    async addComment(bookId: MangaId, data: AddCommentDto, userId: UserId): Promise<void> {
        const parentComment = await this.prisma.mangaComments.findUnique({
            where: { id: data.parentId || 0 },
        });
        const nestingLevel = parentComment?.nestingLevel ? parentComment.nestingLevel + 1 : 0;
        const rootComment = parentComment?.rootComment ? parentComment.rootComment : 0;
        await this.prisma.mangaComments.create({
            data: {
                ...data,
                bookId,
                userId,
                nestingLevel,
                rootComment,
            },
        });
        return;
    }

    async updateComment(
        { mangaId: bookId, commentId }: MangaCommentIdParam,
        data: UpdateCommentDto,
    ): Promise<void> {
        await this.prisma.mangaComments.update({
            where: { bookId, id: commentId },
            data: data,
        });
        return;
    }

    async deleteComment({ mangaId: bookId, commentId }: MangaCommentIdParam): Promise<void> {
        const deleteComment = await this.prisma.mangaComments.findUnique({
            where: { bookId, id: commentId },
            select: { _count: { select: { children: true } } },
        });
        if (!deleteComment) return;

        if (!deleteComment._count.children) {
            await this.prisma.mangaComments.delete({ where: { bookId, id: commentId } });
            return;
        }

        await this.prisma.mangaComments.update({
            where: { bookId, id: commentId },
            data: { isDeleted: true },
        });
        return;
    }
}
