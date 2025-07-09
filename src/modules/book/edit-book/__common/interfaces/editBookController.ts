import { LangQuery } from 'src/shared/dto/langQuery.dto';
import { EditedBook } from '../dto/editedBook.dto';
import { MutateBookFilesDto } from '../dto/mutateBookFiles.dto';
import { MutateBookDto } from '../dto/mutateBook.dto';
import { BookIdParam } from 'src/modules/book/_common/model/bookId';

export interface EditBookControllerInterface {
    getEditedBook: (params: BookIdParam, query: LangQuery) => Promise<EditedBook>;
    createBook: (body: MutateBookDto, files: MutateBookFilesDto) => Promise<void>;
    updateBook: (
        params: BookIdParam,
        body: MutateBookDto,
        banner?: Express.Multer.File,
    ) => Promise<void>;
}
