import { BookChapterId, BookId } from 'src/modules/book/_common/model/bookId';
import { EditedBookChapter } from '../dto/editedBookChapter.dto';
import { EditedBookChapterList, EditedBookChapterListQuery } from '../dto/editedBookChapterList';
import { MutateBookChapterDto } from '../dto/mutateChapter.dto';

export interface EditBookChaptersServiceInterface {
    getEditedChapterList: (
        bookId: BookId,
        query: EditedBookChapterListQuery,
    ) => Promise<EditedBookChapterList>;
    getEditedChapter: (bookId: BookId, chapterId: BookChapterId) => Promise<EditedBookChapter>;
    createChapter: (bookId: BookId, data: MutateBookChapterDto) => Promise<void>;
    updateChapter: (
        bookId: BookId,
        chapterId: BookChapterId,
        data: MutateBookChapterDto,
    ) => Promise<void>;
    toggleChapterPublish: (bookId: BookId, chapterId: BookChapterId) => Promise<void>;
}
