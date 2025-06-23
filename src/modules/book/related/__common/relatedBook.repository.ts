import { LangType } from 'src/shared/dto/query/langQuery.dto';
import { RelatedBookDto } from './dto/relatedBook.dto';
import { BookRelated } from './bookRelated';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/prisma/prisma.service';
import { getRelatedBooks } from './prisma/getRelatedBooks';
import { toRelatedBookDto } from './prisma/toRelatedBookDto';

interface RelatedBookRepositoryInt {
    getRelatedBooks: (bookRelated: BookRelated, lang: LangType) => Promise<RelatedBookDto[]>;
}

@Injectable()
export class RelatedBookRepository implements RelatedBookRepositoryInt {
    constructor(private prisma: PrismaService) {}

    async getRelatedBooks(bookRelated: BookRelated, lang: LangType): Promise<RelatedBookDto[]> {
        const [manga] = await getRelatedBooks(this.prisma, bookRelated, lang);
        return toRelatedBookDto(manga, bookRelated, lang);
    }
}
