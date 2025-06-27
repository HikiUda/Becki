import { LangType } from 'src/shared/dto/query/langQuery.dto';
import { EditedBookDto } from '../dto/editedBook.dto';
import { MutateBookDto } from '../dto/mutateBook.dto';

export interface EditBookRepositoryInterface<> {
    getEditedBook: (bookId: number, lang: LangType) => Promise<EditedBookDto>;
    createBook: (dto: MutateBookDto) => Promise<number>;
    updateBook: (dto: MutateBookDto, bookId: number, lang: LangType) => Promise<EditedBookDto>;
    deleteBook: (bookId: number) => Promise<number>;
    getBookBanner: (bookId: number) => Promise<string | null>;
}
