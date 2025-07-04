import { Lang } from 'src/shared/dto/langQuery.dto';
import { Book } from '../dto/book.dto';
import { BookId } from 'src/modules/book/_common/model/bookId';
import { BookCover } from '../dto/bookCovers.dto';

export interface BookRepositoryInterface {
    getBook: (bookId: BookId, lang: Lang) => Promise<Book>;
    getBookCovers: (bookId: BookId) => Promise<BookCover[]>;
}
