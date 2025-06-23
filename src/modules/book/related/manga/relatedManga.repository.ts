import { Injectable } from '@nestjs/common';
import { RelatedBookRepositoryInterface } from '../__common/interfaces/relatedBookRepository';
import { BookRelated } from '../__common/bookRelated';
import { PrismaService } from 'src/shared/prisma/prisma.service';
import { getMangaRelated } from './prisma/getMangaRelated';

@Injectable()
export class RelatedMangaRepository implements RelatedBookRepositoryInterface {
    constructor(private prisma: PrismaService) {}
    async getBookRelated(bookId: number): Promise<BookRelated | null> {
        return await getMangaRelated(this.prisma, bookId);
    }
}
