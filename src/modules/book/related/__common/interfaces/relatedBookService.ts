import { LangType } from 'src/shared/dto/query/langQuery.dto';
import { RelatedBookListDto } from '../dto/relatedBook.dto';
import { AddBookRelated } from '../dto/addRelatedBooks.dto';
import { DeleteRelatedBookDto, UpdateRelatedBookDto } from '../dto/mutateRelatedBook.dto';

export interface RelatedBookServiceInterface {
    getRelatedBooks: (bookId: number, lang: LangType) => Promise<RelatedBookListDto>;
    addRelatedBooks: (bookId: number, data: AddBookRelated) => Promise<void>;
    updateRelatedBooks: (bookId: number, data: UpdateRelatedBookDto) => Promise<void>;
    deleteRelatedBooks: (bookId: number, data: DeleteRelatedBookDto) => Promise<void>;
}
