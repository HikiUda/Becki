import { EditedBookChapterDto } from '../dto/editedBookChapter.dto';
import { EditedBookChapterList, EditedBookChapterListQueryDto } from '../dto/editedBookChapterList';
import { MutateBookChapterDto } from '../dto/mutateChapter.dto';

export interface EditBookChaptersServiceInterface {
    getEditedChapterList: (
        bookId: number,
        query: EditedBookChapterListQueryDto,
    ) => Promise<EditedBookChapterList>;
    getEditedChapter: (bookId: number, chapterId: number) => Promise<EditedBookChapterDto>;
    createChapter: (bookId: number, dto: MutateBookChapterDto) => Promise<void>;
    updateChapter: (bookId: number, chapterId: number, dto: MutateBookChapterDto) => Promise<void>;
}
