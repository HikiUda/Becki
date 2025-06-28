import { LangQueryDto } from 'src/shared/dto/query/langQuery.dto';
import { EditedBookDto } from '../dto/editedBook.dto';
import { MutateBookFilesDto } from '../dto/mutateBookFiles.dto';
import { MutateBookDto } from '../dto/mutateBook.dto';

export interface EditBookControllerInterface {
    getEditedBook: (bookId: number, query: LangQueryDto) => Promise<EditedBookDto>;
    createBook: (
        dto: MutateBookDto,
        query: LangQueryDto,
        files: MutateBookFilesDto,
    ) => Promise<EditedBookDto>;
    updateBook: (
        bookId: number,
        body: MutateBookDto,
        query: LangQueryDto,
        banner: Express.Multer.File,
    ) => Promise<EditedBookDto>;
}
