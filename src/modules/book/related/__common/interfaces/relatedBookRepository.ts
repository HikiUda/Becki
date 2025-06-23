import { BookRelated } from '../bookRelated';

export interface RelatedBookRepositoryInterface {
    getBookRelated: (bookId: number) => Promise<BookRelated | null>;
}
