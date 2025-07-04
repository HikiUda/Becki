import { Lang } from 'src/shared/dto/langQuery.dto';
import { EditedBook } from '../dto/editedBook.dto';
import { MutateBookDto } from '../dto/mutateBook.dto';
import { MutateBookFilesDto } from '../dto/mutateBookFiles.dto';
import { BookId } from 'src/modules/book/_common/model/bookId';

export interface EditBookServiceInterface {
    getEditedBook: (bookId: BookId, lang: Lang) => Promise<EditedBook>;
    createBook: (data: MutateBookDto, files: MutateBookFilesDto, lang: Lang) => Promise<void>;
    updateBook: (
        data: MutateBookDto,
        bookId: BookId,
        banner?: Express.Multer.File,
    ) => Promise<void>;
}
