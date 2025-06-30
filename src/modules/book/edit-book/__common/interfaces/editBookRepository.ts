import { LangType } from 'src/shared/dto/query/langQuery.dto';
import { EditedBook } from '../dto/editedBook.dto';
import { MutateBookDto } from '../dto/mutateBook.dto';

export interface EditBookRepositoryInterface<> {
    getEditedBook: (bookId: number, lang: LangType) => Promise<EditedBook>;
    createBook: (data: MutateBookDto) => Promise<number>;
    updateBook: (data: MutateBookDto, bookId: number) => Promise<void>;
    addCover: (cover: string, bookId: number) => Promise<void>;
    getBookBanner: (bookId: number) => Promise<string | null>;
}
