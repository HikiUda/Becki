import { Injectable } from '@nestjs/common';
import { RelatedBookRepositoryInterface } from '../__common/interfaces/relatedBookRepository';
import { BookRelated } from '../__common/bookRelated';
import { PrismaService } from 'src/shared/prisma/prisma.service';
import { getMangaRelated } from './prisma/getMangaRelated';
import { setMangaRelated } from './prisma/setMangaRelated';

@Injectable()
export class RelatedMangaRepository implements RelatedBookRepositoryInterface {
    constructor(private prisma: PrismaService) {}

    async getBookRelated(bookId: number): Promise<BookRelated | null> {
        return await getMangaRelated(this.prisma, bookId);
    }

    async setBookRelated(bookId: number, bookRelated: Partial<BookRelated>): Promise<BookRelated> {
        return await setMangaRelated(this.prisma, bookId, bookRelated);
    }
}
