import { LangQueryDto } from 'src/shared/dto/query/langQuery.dto';
import { RelatedBookListDto } from '../dto/relatedBook.dto';
import { AddRelatedBooksDto } from '../dto/addRelatedBooks.dto';
import { DeleteRelatedBookDto, UpdateRelatedBookDto } from '../dto/mutateRelatedBook.dto';

export interface RelatedBookControllerInterface {
    getRelatedBooks: (bookId: number, query: LangQueryDto) => Promise<RelatedBookListDto>;
    addRelatedBooks: (bookId: number, body: AddRelatedBooksDto) => Promise<void>;
    updateRelatedBooks: (bookId: number, body: UpdateRelatedBookDto) => Promise<void>;
    deleteRelatedBooks: (bookId: number, body: DeleteRelatedBookDto) => Promise<void>;
}
