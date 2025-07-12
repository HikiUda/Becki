import { RelatedBookDtoList } from '../dto/relatedBook.dto';
import { AddBookRelated } from '../dto/addRelatedBooks.dto';
import { DeleteRelatedBookDto, UpdateRelatedBookDto } from '../dto/mutateRelatedBook.dto';
import { BookId } from 'src/modules/book/_common/model/bookId';

export interface RelatedBookServiceInterface {
    getRelatedBooks: (bookId: BookId) => Promise<RelatedBookDtoList>;
    addBookRelated: (bookId: BookId, data: AddBookRelated) => Promise<void>;
    updateBookRelated: (bookId: BookId, data: UpdateRelatedBookDto) => Promise<void>;
    deleteBookRelated: (bookId: BookId, data: DeleteRelatedBookDto) => Promise<void>;
}
