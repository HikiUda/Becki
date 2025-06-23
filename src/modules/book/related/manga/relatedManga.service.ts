import { Injectable } from '@nestjs/common';
import { RelatedBookServiceInterface } from '../__common/interfaces/relatedBookService';
import { RelatedBookListDto } from '../__common/dto/relatedBook.dto';
import { RelatedMangaRepository } from './relatedManga.repository';
import { RelatedBookRepository } from '../__common/relatedBook.repository';
import { LangType } from 'src/shared/dto/query/langQuery.dto';

@Injectable()
export class RelatedMangaService implements RelatedBookServiceInterface {
    constructor(
        private repository: RelatedMangaRepository,
        private relatedBookRepository: RelatedBookRepository,
    ) {}

    async getRelatedBooks(bookId: number, lang: LangType): Promise<RelatedBookListDto> {
        const bookRelated = await this.repository.getBookRelated(bookId);
        if (!bookRelated) return { data: [] };
        const books = await this.relatedBookRepository.getRelatedBooks(bookRelated, lang);
        return { data: books };
    }
}
