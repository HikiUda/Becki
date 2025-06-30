import { LangType } from 'src/shared/dto/query/langQuery.dto';
import { RelatedBookDtoList } from '../dto/relatedBook.dto';
import { AddBookRelated } from '../dto/addRelatedBooks.dto';
import { DeleteRelatedBookDto, UpdateRelatedBookDto } from '../dto/mutateRelatedBook.dto';

export interface RelatedBookServiceInterface {
    getRelatedBooks: (bookId: number, lang: LangType) => Promise<RelatedBookDtoList>;
    addBookRelated: (bookId: number, data: AddBookRelated) => Promise<void>;
    updateBookRelated: (bookId: number, data: UpdateRelatedBookDto) => Promise<void>;
    deleteBookRelated: (bookId: number, data: DeleteRelatedBookDto) => Promise<void>;
}
