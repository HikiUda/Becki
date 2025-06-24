import { BookRelated } from '../bookRelated';

export interface RelatedBookRepositoryInterface {
    getBookRelated: (bookId: number) => Promise<BookRelated | null>;
    setBookRelated: (bookId: number, bookRelated: Partial<BookRelated>) => Promise<BookRelated>;
}
