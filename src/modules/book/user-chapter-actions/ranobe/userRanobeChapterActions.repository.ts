import { BadRequestException, Injectable } from '@nestjs/common';
import { UserBookChapterActionsRepositoryInterface } from '../__common/interfaces/userBookChapterActionsRepository';
import { PrismaService } from 'src/shared/prisma/prisma.service';
import { UserId } from 'src/modules/authorization';
import { RanobeChapterParams } from '../../_common/model/bookId';
import { UserLikeBookChapterDto } from '../__common/dto/userLikeBookChapter.dto';

@Injectable()
export class UserRanobeChapterActionsRepository
    implements UserBookChapterActionsRepositoryInterface
{
    constructor(private prisma: PrismaService) {}

    async addUserViewChapter(
        { ranobeId: bookId, chapterId }: RanobeChapterParams,
        userId: UserId,
    ): Promise<void> {
        try {
            await this.prisma.userViewRanobeChapters.create({
                data: { chapterId, userId },
            });
        } catch {
            throw new BadRequestException(
                `Пользователь с id-${userId} уже смотрел главу с id-${chapterId}`,
            );
        }

        await this.prisma.ranobeStatistic.update({
            where: { bookId },
            data: { viewCount: { increment: 1 } },
        });
        return;
    }

    async getUserLikeChapter(
        { chapterId }: RanobeChapterParams,
        userId?: UserId,
    ): Promise<UserLikeBookChapterDto> {
        const likeCount = await this.prisma.userLikeRanobeChapters.count({
            where: { chapterId },
        });
        const isLiked =
            !!userId &&
            (await this.prisma.userLikeRanobeChapters.findUnique({
                where: { userId_chapterId: { userId, chapterId } },
                select: { userId: true },
            }));
        return { isLiked: !!isLiked, likeCount };
    }

    async setUserLikeChapter(
        { ranobeId: bookId, chapterId }: RanobeChapterParams,
        userId: UserId,
    ): Promise<void> {
        const isLiked = await this.prisma.userLikeRanobeChapters.findUnique({
            where: { userId_chapterId: { userId, chapterId } },
            select: { userId: true },
        });

        if (isLiked) {
            await this.prisma.userLikeRanobeChapters.delete({
                where: { userId_chapterId: { userId, chapterId } },
            });
            await this.prisma.ranobeStatistic.update({
                where: { bookId },
                data: { likeCount: { decrement: 1 } },
            });
        } else {
            await this.prisma.userLikeRanobeChapters.create({ data: { userId, chapterId } });
            await this.prisma.ranobeStatistic.update({
                where: { bookId },
                data: { likeCount: { increment: 1 } },
            });
        }
        return;
    }
}
