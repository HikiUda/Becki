import { Lang } from 'src/shared/dto/langQuery.dto';
import { EditedBook } from '../dto/editedBook.dto';
import { MutateBookDto } from '../dto/mutateBook.dto';
import { BookId } from 'src/modules/book/_common/model/bookId';

export interface EditBookRepositoryInterface<> {
    getEditedBook: (bookId: BookId, lang: Lang) => Promise<EditedBook>;
    createBook: (data: MutateBookDto) => Promise<BookId>;
    updateBook: (data: MutateBookDto, bookId: BookId) => Promise<void>;
    addCover: (cover: string, bookId: BookId) => Promise<void>;
    getBookBanner: (bookId: BookId) => Promise<string | null>;
}
