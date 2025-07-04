import { Injectable } from '@nestjs/common';
import { BookRateRepositoryInterface } from '../__common/interfaces/bookRateRepository';
import { PrismaService } from 'src/shared/prisma/prisma.service';
import { UserId } from 'src/modules/user/auth';
import { RanobeId } from '../../_common/model/bookId';
import { UserBookRate } from '../__common/dto/userBookRate.dto';
import { getBookRatingId } from '../__common/getBookRatingId';

@Injectable()
export class RanobeRateRepository implements BookRateRepositoryInterface {
    constructor(private prisma: PrismaService) {}

    async getRate(bookId: RanobeId, userId: UserId): Promise<UserBookRate> {
        const data = await this.prisma.ranobeRating.findUnique({
            where: { id: getBookRatingId(userId, bookId) },
            select: { rate: true },
        });
        return {
            userId,
            bookId,
            rate: data?.rate || null,
        };
    }

    async setRate(bookId: RanobeId, userId: UserId, rate: number): Promise<void> {
        const bookRatingId = getBookRatingId(userId, bookId);
        await this.prisma.ranobeRating.upsert({
            where: { id: bookRatingId },
            create: { id: bookRatingId, userId, bookId, rate },
            update: { rate },
        });
        return;
    }

    async deleteRate(bookId: RanobeId, userId: UserId): Promise<void> {
        await this.prisma.ranobeRating.delete({
            where: { id: getBookRatingId(userId, bookId) },
        });
        return;
    }
}
