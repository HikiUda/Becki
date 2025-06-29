import { LangType } from 'src/shared/dto/query/langQuery.dto';
import { EditedBookDto } from '../dto/editedBook.dto';
import { MutateBookDto } from '../dto/mutateBook.dto';
import { MutateBookFilesDto } from '../dto/mutateBookFiles.dto';

export interface EditBookServiceInterface {
    getEditedBook: (bookId: number, lang: LangType) => Promise<EditedBookDto>;
    createBook: (
        dto: MutateBookDto,
        files: MutateBookFilesDto,
        lang: LangType,
    ) => Promise<EditedBookDto>;
    updateBook: (
        dto: MutateBookDto,
        bookId: number,
        lang: LangType,
        banner?: Express.Multer.File,
    ) => Promise<EditedBookDto>;
}
