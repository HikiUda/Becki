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
    getRelatedBooks: (bookRelated: BookRelated, lang: Lang) => Promise<RelatedBookDto[]>;
    getBooksByUrlIds: (ids: string[]) => Promise<BooksByUrlIds>;
}

@Injectable()
export class RelatedBookRepository implements RelatedBookRepositoryInt {
    constructor(private prisma: PrismaService) {}

    async getRelatedBooks(bookRelated: BookRelated, lang: Lang): Promise<RelatedBookDto[]> {
        const { manga, ranobe } = await getRelatedBooks(this.prisma, bookRelated, lang);
        return [
            ...toRelatedBookDto(manga, bookRelated, 'manga', lang),
            ...toRelatedBookDto(ranobe, bookRelated, 'ranobe', lang),
        ];
    }

    async getBooksByUrlIds(ids: string[]): Promise<BooksByUrlIds> {
        return await getBooksByUrlIds(this.prisma, ids);
    }
}
