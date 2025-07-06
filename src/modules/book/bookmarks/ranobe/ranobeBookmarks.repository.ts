import { Injectable } from '@nestjs/common';
import { BookBookmarksRepositoryInterface } from '../__common/interfaces/bookmarkRepository';
import { PrismaService } from 'src/shared/prisma/prisma.service';
import { UserId } from 'src/modules/user/auth';
import { RanobeId } from '../../_common/model/bookId';
import { AddRanobeBookmarkDto } from '../__common/dto/addBookBookmark.dto';
import { UserBookBookmark } from '../__common/dto/userBookBookmark.dto';

@Injectable()
export class RanobeBookmarksRepository implements BookBookmarksRepositoryInterface {
    constructor(private prisma: PrismaService) {}

    async getBookmark(bookId: RanobeId, userId: UserId): Promise<UserBookBookmark> {
        const data = await this.prisma.ranobeBookmarks.findUnique({
            where: { userId_bookId: { userId, bookId } },
            select: { bookmark: true },
        });

        return {
            userId,
            bookId,
            bookmark: data?.bookmark || null,
        };
    }

    async setBookmark(bookId: RanobeId, userId: UserId, data: AddRanobeBookmarkDto): Promise<void> {
        const show = data.bookmark === 'Reading' || data.bookmark === 'Planned';
        await this.prisma.ranobeBookmarks.upsert({
            where: { userId_bookId: { userId, bookId } },
            create: { bookId, userId, ...data, show },
            update: { bookmark: data.bookmark, show },
        });
        return;
    }

    async deleteBookmark(bookId: RanobeId, userId: UserId): Promise<void> {
        await this.prisma.ranobeBookmarks.delete({
            where: { userId_bookId: { userId, bookId } },
        });
        return;
    }
}
