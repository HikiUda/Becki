import { EditedBookChapter } from '../dto/editedBookChapter.dto';
import { EditedBookChapterList, EditedBookChapterListQuery } from '../dto/editedBookChapterList';
import { MutateBookChapterDto } from '../dto/mutateChapter.dto';

export interface EditBookChaptersRepositoryInterface {
    getEditedChapterList: (
        bookId: number,
        query: EditedBookChapterListQuery,
    ) => Promise<EditedBookChapterList>;
    getEditedChapter: (bookId: number, chapterId: number) => Promise<EditedBookChapter>;
    createChapter: (bookId: number, data: MutateBookChapterDto) => Promise<void>;
    updateChapter: (bookId: number, chapterId: number, data: MutateBookChapterDto) => Promise<void>;
    toggleChapterPublish: (bookId: number, chapterId: number) => Promise<void>;
}
