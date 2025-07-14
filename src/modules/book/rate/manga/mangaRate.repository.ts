import { Injectable } from '@nestjs/common';
import { BookRateRepositoryInterface } from '../__common/interfaces/bookRateRepository';
import { PrismaService } from 'src/shared/prisma/prisma.service';
import { UserId } from 'src/modules/authorization';
import { MangaId } from '../../_common/model/bookId';
import { UserBookRate } from '../__common/dto/userBookRate.dto';

@Injectable()
export class MangaRateRepository implements BookRateRepositoryInterface {
    constructor(private prisma: PrismaService) {}

    async getRate(bookId: MangaId, userId: UserId): Promise<UserBookRate> {
        const data = await this.prisma.mangaRating.findUnique({
            where: { userId_bookId: { userId, bookId } },
            select: { rate: true },
        });
        return {
            userId,
            bookId,
            rate: data?.rate || null,
        };
    }

    async setRate(bookId: MangaId, userId: UserId, rate: number): Promise<void> {
        await this.prisma.mangaRating.upsert({
            where: { userId_bookId: { userId, bookId } },
            create: { userId, bookId, rate },
            update: { rate },
        });
        return;
    }

    async deleteRate(bookId: MangaId, userId: UserId): Promise<void> {
        await this.prisma.mangaRating.delete({
            where: { userId_bookId: { userId, bookId } },
        });
        return;
    }
}
