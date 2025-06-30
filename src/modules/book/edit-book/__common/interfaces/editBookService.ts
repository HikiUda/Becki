import { LangType } from 'src/shared/dto/query/langQuery.dto';
import { EditedBook } from '../dto/editedBook.dto';
import { MutateBookDto } from '../dto/mutateBook.dto';
import { MutateBookFilesDto } from '../dto/mutateBookFiles.dto';

export interface EditBookServiceInterface {
    getEditedBook: (bookId: number, lang: LangType) => Promise<EditedBook>;
    createBook: (data: MutateBookDto, files: MutateBookFilesDto, lang: LangType) => Promise<void>;
    updateBook: (
        data: MutateBookDto,
        bookId: number,
        banner?: Express.Multer.File,
    ) => Promise<void>;
}
