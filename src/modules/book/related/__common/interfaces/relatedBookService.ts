import { LangType } from 'src/shared/dto/query/langQuery.dto';
import { RelatedBookListDto } from '../dto/relatedBook.dto';

export interface RelatedBookServiceInterface {
    getRelatedBooks: (bookId: number, lang: LangType) => Promise<RelatedBookListDto>;
}
