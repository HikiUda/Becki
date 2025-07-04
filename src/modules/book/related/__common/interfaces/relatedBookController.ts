import { LangQuery } from 'src/shared/dto/langQuery.dto';
import { RelatedBookDtoList } from '../dto/relatedBook.dto';
import { AddRelatedBooksDto } from '../dto/addRelatedBooks.dto';
import { DeleteRelatedBookDto, UpdateRelatedBookDto } from '../dto/mutateRelatedBook.dto';
import { BookIdParam } from 'src/modules/book/_common/model/bookId';

export interface RelatedBookControllerInterface {
    getRelatedBooks: (params: BookIdParam, query: LangQuery) => Promise<RelatedBookDtoList>;
    addBookRelated: (params: BookIdParam, body: AddRelatedBooksDto) => Promise<void>;
    updateBookRelated: (params: BookIdParam, body: UpdateRelatedBookDto) => Promise<void>;
    deleteBookRelated: (params: BookIdParam, body: DeleteRelatedBookDto) => Promise<void>;
}
