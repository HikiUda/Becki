import { LangQuery } from 'src/shared/dto/langQuery.dto';
import { Book } from '../dto/book.dto';
import { BookCoverList } from '../dto/bookCovers.dto';
import { BookIdParam } from 'src/modules/book/_common/model/bookId';

export interface BookControllerInterface {
    getBook: (params: BookIdParam, query: LangQuery) => Promise<Book>;
    getBookCovers: (params: BookIdParam) => Promise<BookCoverList>;
}
