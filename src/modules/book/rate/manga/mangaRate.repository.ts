import { Injectable } from '@nestjs/common';
import { BookRateRepositoryInterface } from '../__common/interfaces/bookRateRepository';
import { PrismaService } from 'src/shared/prisma/prisma.service';
import { UserId } from 'src/modules/user/auth';
import { MangaId } from '../../_common/model/bookId';
import { UserBookRate } from '../__common/dto/userBookRate.dto';
import { getBookRatingId } from '../__common/getBookRatingId';

@Injectable()
export class MangaRateRepository implements BookRateRepositoryInterface {
    constructor(private prisma: PrismaService) {}

    async getRate(bookId: MangaId, userId: UserId): Promise<UserBookRate> {
        const data = await this.prisma.mangaRating.findUnique({
            where: { id: getBookRatingId(userId, bookId) },
            select: { rate: true },
        });
        return {
            userId,
            bookId,
            rate: data?.rate || null,
        };
    }

    async setRate(bookId: MangaId, userId: UserId, rate: number): Promise<void> {
        const bookRatingId = getBookRatingId(userId, bookId);
        await this.prisma.mangaRating.upsert({
            where: { id: bookRatingId },
            create: { id: bookRatingId, userId, bookId, rate },
            update: { rate },
        });
        return;
    }

    async deleteRate(bookId: MangaId, userId: UserId): Promise<void> {
        await this.prisma.mangaRating.delete({
            where: { id: getBookRatingId(userId, bookId) },
        });
        return;
    }
}
