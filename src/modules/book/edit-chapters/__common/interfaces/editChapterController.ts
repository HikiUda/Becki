import { BookChapterParams, BookIdParam } from 'src/modules/book/_common/model/bookId';
import { EditedBookChapter } from '../dto/editedBookChapter.dto';
import { EditedBookChapterList, EditedBookChapterListQuery } from '../dto/editedBookChapterList';
import { MutateBookChapterDto } from '../dto/mutateChapter.dto';

export interface EditBookChaptersControllerInterface {
    getEditedChapterList: (
        params: BookIdParam,
        query: EditedBookChapterListQuery,
    ) => Promise<EditedBookChapterList>;
    getEditedChapter: (params: BookChapterParams) => Promise<EditedBookChapter>;
    createChapter: (params: BookIdParam, body: MutateBookChapterDto) => Promise<void>;
    updateChapter: (params: BookChapterParams, body: MutateBookChapterDto) => Promise<void>;
    toggleChapterPublish: (params: BookChapterParams) => Promise<void>;
}
