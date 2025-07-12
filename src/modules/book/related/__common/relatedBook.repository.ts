import { Lang } from 'src/shared/dto/langQuery.dto';
import { RelatedBookDto } from './dto/relatedBook.dto';
import { BookRelated } from './bookRelated';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/prisma/prisma.service';
import { getRelatedBooks } from './prisma/getRelatedBooks';
import { toRelatedBookDto } from './prisma/toRelatedBookDto';
import { getBooksByUrlIds } from './prisma/getBooksByUrlIds';
import { BooksByUrlIds } from './dto/addRelatedBooks.dto';

interface RelatedBookRepositoryInt {
    getRelatedBooks: (bookRelated: BookRelated) => Promise<RelatedBookDto[]>;
    getBooksByUrlIds: (ids: string[]) => Promise<BooksByUrlIds>;
}

@Injectable()
export class RelatedBookRepository implements RelatedBookRepositoryInt {
    constructor(private prisma: PrismaService) {}

    async getRelatedBooks(bookRelated: BookRelated): Promise<RelatedBookDto[]> {
        const { manga, ranobe } = await getRelatedBooks(this.prisma, bookRelated);
        return [
            ...toRelatedBookDto(manga, bookRelated, 'manga'),
            ...toRelatedBookDto(ranobe, bookRelated, 'ranobe'),
        ];
    }

    async getBooksByUrlIds(ids: string[]): Promise<BooksByUrlIds> {
        return await getBooksByUrlIds(this.prisma, ids);
    }
}
