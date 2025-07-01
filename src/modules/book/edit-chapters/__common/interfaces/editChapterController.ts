import { EditBookChapterParams } from '../dto/editBookChapterParams.dto';
import { EditedBookChapter } from '../dto/editedBookChapter.dto';
import { EditedBookChapterList, EditedBookChapterListQuery } from '../dto/editedBookChapterList';
import { MutateBookChapterDto } from '../dto/mutateChapter.dto';

export interface EditBookChaptersControllerInterface {
    getEditedChapterList: (
        bookId: number,
        query: EditedBookChapterListQuery,
    ) => Promise<EditedBookChapterList>;
    getEditedChapter: (params: EditBookChapterParams) => Promise<EditedBookChapter>;
    createChapter: (bookId: number, body: MutateBookChapterDto) => Promise<void>;
    updateChapter: (params: EditBookChapterParams, body: MutateBookChapterDto) => Promise<void>;
    toggleChapterPublish: (params: EditBookChapterParams) => Promise<void>;
}
