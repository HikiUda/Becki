import { Injectable } from '@nestjs/common';
import { RelatedBookServiceInterface } from '../__common/interfaces/relatedBookService';
import { RelatedBookDtoList } from '../__common/dto/relatedBook.dto';
import { RelatedRanobeRepository } from './relatedRanobe.repository';
import { RelatedBookRepository } from '../__common/relatedBook.repository';
import { Lang } from 'src/shared/dto/langQuery.dto';
import { AddBookRelated, getAddedBookRelated } from '../__common/dto/addRelatedBooks.dto';
import { UpdateRelatedBookDto, DeleteRelatedBookDto } from '../__common/dto/mutateRelatedBook.dto';
import { BookRelatedDefault } from '../__common/bookRelated';
import { RanobeId } from '../../_common/model/bookId';

@Injectable()
export class RelatedRanobeService implements RelatedBookServiceInterface {
    constructor(
        private repository: RelatedRanobeRepository,
        private relatedBookRepository: RelatedBookRepository,
    ) {}

    async getRelatedBooks(bookId: RanobeId, lang: Lang): Promise<RelatedBookDtoList> {
        const bookRelated = await this.repository.getBookRelated(bookId);
        if (!bookRelated) return { data: [] };
        const books = await this.relatedBookRepository.getRelatedBooks(bookRelated, lang);
        return { data: books };
    }

    async addBookRelated(bookId: RanobeId, data: AddBookRelated): Promise<void> {
        const bookRelated = (await this.repository.getBookRelated(bookId)) || BookRelatedDefault;
        const booksByUrlIds = await this.relatedBookRepository.getBooksByUrlIds(Object.keys(data));
        await this.repository.setBookRelated(
            bookId,
            getAddedBookRelated(booksByUrlIds, data, bookRelated),
        );
        return;
    }

    async updateBookRelated(bookId: RanobeId, data: UpdateRelatedBookDto): Promise<void> {
        const { relatedId, relationship } = data;
        const bookRelated = (await this.repository.getBookRelated(bookId)) || BookRelatedDefault;
        const newRelated = { ...bookRelated[relatedId[0]], [relatedId[1]]: relationship };
        await this.repository.setBookRelated(bookId, { [relatedId[0]]: newRelated });
    }

    async deleteBookRelated(bookId: RanobeId, data: DeleteRelatedBookDto): Promise<void> {
        const { relatedId } = data;
        const bookRelated = (await this.repository.getBookRelated(bookId)) || BookRelatedDefault;
        const newRelated = { ...bookRelated[relatedId[0]] };
        delete newRelated[relatedId[1]];
        await this.repository.setBookRelated(bookId, { [relatedId[0]]: newRelated });
    }
}
