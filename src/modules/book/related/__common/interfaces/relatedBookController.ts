import { LangQueryDto } from 'src/shared/dto/query/langQuery.dto';
import { RelatedBookDtoList } from '../dto/relatedBook.dto';
import { AddRelatedBooksDto } from '../dto/addRelatedBooks.dto';
import { DeleteRelatedBookDto, UpdateRelatedBookDto } from '../dto/mutateRelatedBook.dto';

export interface RelatedBookControllerInterface {
    getRelatedBooks: (bookId: number, query: LangQueryDto) => Promise<RelatedBookDtoList>;
    addBookRelated: (bookId: number, body: AddRelatedBooksDto) => Promise<void>;
    updateBookRelated: (bookId: number, body: UpdateRelatedBookDto) => Promise<void>;
    deleteBookRelated: (bookId: number, body: DeleteRelatedBookDto) => Promise<void>;
}
