import { LangQueryDto } from 'src/shared/dto/query/langQuery.dto';
import { EditedBook } from '../dto/editedBook.dto';
import { MutateBookFilesDto } from '../dto/mutateBookFiles.dto';
import { MutateBookDto } from '../dto/mutateBook.dto';

export interface EditBookControllerInterface {
    getEditedBook: (bookId: number, query: LangQueryDto) => Promise<EditedBook>;
    createBook: (body: MutateBookDto, files: MutateBookFilesDto) => Promise<void>;
    updateBook: (bookId: number, body: MutateBookDto, banner: Express.Multer.File) => Promise<void>;
}
