import { EditBookChapterParamsDto } from '../dto/editBookChapterParams.dto';
import { EditedBookChapterDto } from '../dto/editedBookChapter.dto';
import { EditedBookChapterList, EditedBookChapterListQueryDto } from '../dto/editedBookChapterList';
import { MutateBookChapterDto } from '../dto/mutateChapter.dto';

export interface EditBookChaptersControllerInterface {
    getEditedChapterList: (
        bookId: number,
        query: EditedBookChapterListQueryDto,
    ) => Promise<EditedBookChapterList>;
    getEditedChapter: (params: EditBookChapterParamsDto) => Promise<EditedBookChapterDto>;
    createChapter: (bookId: number, dto: MutateBookChapterDto) => Promise<void>;
    updateChapter: (params: EditBookChapterParamsDto, dto: MutateBookChapterDto) => Promise<void>;
}
