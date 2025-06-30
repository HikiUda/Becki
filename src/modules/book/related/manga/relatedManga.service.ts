import { Injectable } from '@nestjs/common';
import { RelatedBookServiceInterface } from '../__common/interfaces/relatedBookService';
import { RelatedBookDtoList } from '../__common/dto/relatedBook.dto';
import { RelatedMangaRepository } from './relatedManga.repository';
import { RelatedBookRepository } from '../__common/relatedBook.repository';
import { LangType } from 'src/shared/dto/query/langQuery.dto';
import { AddBookRelated, getAddedBookRelated } from '../__common/dto/addRelatedBooks.dto';
import { UpdateRelatedBookDto, DeleteRelatedBookDto } from '../__common/dto/mutateRelatedBook.dto';
import { BookRelatedDefault } from '../__common/bookRelated';

@Injectable()
export class RelatedMangaService implements RelatedBookServiceInterface {
    constructor(
        private repository: RelatedMangaRepository,
        private relatedBookRepository: RelatedBookRepository,
    ) {}

    async getRelatedBooks(bookId: number, lang: LangType): Promise<RelatedBookDtoList> {
        const bookRelated = await this.repository.getBookRelated(bookId);
        if (!bookRelated) return { data: [] };
        const books = await this.relatedBookRepository.getRelatedBooks(bookRelated, lang);
        return { data: books };
    }

    async addBookRelated(bookId: number, data: AddBookRelated): Promise<void> {
        const bookRelated = (await this.repository.getBookRelated(bookId)) || BookRelatedDefault;
        const booksByUrlIds = await this.relatedBookRepository.getBooksByUrlIds(Object.keys(data));
        await this.repository.setBookRelated(
            bookId,
            getAddedBookRelated(booksByUrlIds, data, bookRelated),
        );
        return;
    }

    async updateBookRelated(bookId: number, data: UpdateRelatedBookDto): Promise<void> {
        const { relatedId, relationship } = data;
        const bookRelated = (await this.repository.getBookRelated(bookId)) || BookRelatedDefault;
        const newRelated = { ...bookRelated[relatedId[0]], [relatedId[1]]: relationship };
        await this.repository.setBookRelated(bookId, { [relatedId[0]]: newRelated });
    }

    async deleteBookRelated(bookId: number, data: DeleteRelatedBookDto): Promise<void> {
        const { relatedId } = data;
        const bookRelated = (await this.repository.getBookRelated(bookId)) || BookRelatedDefault;
        const newRelated = { ...bookRelated[relatedId[0]] };
        delete newRelated[relatedId[1]];
        await this.repository.setBookRelated(bookId, { [relatedId[0]]: newRelated });
    }
}
