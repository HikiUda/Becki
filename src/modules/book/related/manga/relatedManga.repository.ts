import { Injectable } from '@nestjs/common';
import { RelatedBookRepositoryInterface } from '../__common/interfaces/relatedBookRepository';
import { BookRelated, BookRelatedDefault } from '../__common/bookRelated';
import { PrismaService } from 'src/shared/prisma/prisma.service';

@Injectable()
export class RelatedMangaRepository implements RelatedBookRepositoryInterface {
    constructor(private prisma: PrismaService) {}

    async getBookRelated(bookId: number): Promise<BookRelated | null> {
        const book = await this.prisma.manga.findUnique({
            where: { id: bookId },
            select: { related: { select: { manga: true, ranobe: true } } },
        });
        if (!book?.related) return null;
        return BookRelated.parse(book.related);
    }

    async setBookRelated(bookId: number, bookRelated: Partial<BookRelated>): Promise<BookRelated> {
        const book = await this.prisma.manga.update({
            where: { id: bookId },
            data: { related: { update: { data: bookRelated } } },
            select: { related: { select: { manga: true, ranobe: true } } },
        });
        if (!book?.related) return BookRelatedDefault;
        return BookRelated.parse(book.related);
    }
}
