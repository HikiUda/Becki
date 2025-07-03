import { LangQueryDto } from 'src/shared/dto/query/langQuery.dto';
import { EditedBook } from '../dto/editedBook.dto';
import { MutateBookFilesDto } from '../dto/mutateBookFiles.dto';
import { MutateBookDto } from '../dto/mutateBook.dto';
import { BookIdParam } from 'src/modules/book/_common/model/bookId';

export interface EditBookControllerInterface {
    getEditedBook: (params: BookIdParam, query: LangQueryDto) => Promise<EditedBook>;
    createBook: (body: MutateBookDto, files: MutateBookFilesDto) => Promise<void>;
    updateBook: (
        params: BookIdParam,
        body: MutateBookDto,
        banner: Express.Multer.File,
    ) => Promise<void>;
}
