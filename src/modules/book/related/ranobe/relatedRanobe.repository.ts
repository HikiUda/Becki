import { Injectable } from '@nestjs/common';
import { RelatedBookRepositoryInterface } from '../__common/interfaces/relatedBookRepository';
import { BookRelated, BookRelatedDefault } from '../__common/bookRelated';
import { PrismaService } from 'src/shared/prisma/prisma.service';
import { RanobeId } from '../../_common/model/bookId';

@Injectable()
export class RelatedRanobeRepository implements RelatedBookRepositoryInterface {
    constructor(private prisma: PrismaService) {}

    async getBookRelated(bookId: RanobeId): Promise<BookRelated | null> {
        const book = await this.prisma.ranobe.findUnique({
            where: { id: bookId },
            select: { related: { select: { manga: true, ranobe: true } } },
        });
        if (!book?.related) return null;
        return BookRelated.parse(book.related);
    }

    async setBookRelated(
        bookId: RanobeId,
        bookRelated: Partial<BookRelated>,
    ): Promise<BookRelated> {
        const book = await this.prisma.ranobe.update({
            where: { id: bookId },
            data: { related: { update: { data: bookRelated } } },
            select: { related: { select: { manga: true, ranobe: true } } },
        });
        if (!book?.related) return BookRelatedDefault;
        return BookRelated.parse(book.related);
    }
}
