import { BookId } from 'src/modules/book/_common/model/bookId';
import { BookRelated } from '../bookRelated';

export interface RelatedBookRepositoryInterface {
    getBookRelated: (bookId: BookId) => Promise<BookRelated | null>;
    setBookRelated: (bookId: BookId, bookRelated: Partial<BookRelated>) => Promise<BookRelated>;
}
