import { LangQueryDto } from 'src/shared/dto/query/langQuery.dto';
import { RelatedBookListDto } from '../dto/relatedBook.dto';

export interface RelatedBookControllerInterface {
    getRelatedBooks: (bookId: number, query: LangQueryDto) => Promise<RelatedBookListDto>;
}
