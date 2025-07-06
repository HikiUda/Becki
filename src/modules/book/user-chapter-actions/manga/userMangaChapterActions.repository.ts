import { BadRequestException, Injectable } from '@nestjs/common';
import { UserBookChapterActionsRepositoryInterface } from '../__common/interfaces/userBookChapterActionsRepository';
import { PrismaService } from 'src/shared/prisma/prisma.service';
import { UserId } from 'src/modules/user/auth';
import { MangaChapterParams } from '../../_common/model/bookId';
import { UserLikeBookChapterDto } from '../__common/dto/userLikeBookChapter.dto';

@Injectable()
export class UserMangaChapterActionsRepository
    implements UserBookChapterActionsRepositoryInterface
{
    constructor(private prisma: PrismaService) {}

    async addUserViewChapter(
        { mangaId: bookId, chapterId }: MangaChapterParams,
        userId: UserId,
    ): Promise<void> {
        try {
            await this.prisma.userViewMangaChapters.create({
                data: { chapterId, userId },
            });
        } catch {
            throw new BadRequestException(
                `Пользователь с id-${userId} уже смотрел главу с id-${chapterId}`,
            );
        }

        await this.prisma.mangaStatistic.update({
            where: { bookId },
            data: { viewCount: { increment: 1 } },
        });
        return;
    }

    async getUserLikeChapter(
        { mangaId: bookId, chapterId }: MangaChapterParams,
        userId?: UserId,
    ): Promise<UserLikeBookChapterDto> {
        const statistic = await this.prisma.mangaStatistic.findUnique({
            where: { bookId },
            select: { likeCount: true },
        });
        const isLiked =
            !!userId &&
            (await this.prisma.userLikeMangaChapters.findUnique({
                where: { userId_chapterId: { userId, chapterId } },
                select: { userId: true },
            }));
        return { isLiked: !!isLiked, likeCount: statistic?.likeCount || 0 };
    }

    async setUserLikeChapter(
        { mangaId: bookId, chapterId }: MangaChapterParams,
        userId: UserId,
    ): Promise<void> {
        const isLiked = await this.prisma.userLikeMangaChapters.findUnique({
            where: { userId_chapterId: { userId, chapterId } },
            select: { userId: true },
        });

        if (isLiked) {
            await this.prisma.userLikeMangaChapters.delete({
                where: { userId_chapterId: { userId, chapterId } },
            });
            await this.prisma.mangaStatistic.update({
                where: { bookId },
                data: { likeCount: { decrement: 1 } },
            });
        } else {
            await this.prisma.userLikeMangaChapters.create({ data: { userId, chapterId } });
            await this.prisma.mangaStatistic.update({
                where: { bookId },
                data: { likeCount: { increment: 1 } },
            });
        }
        return;
    }
}
