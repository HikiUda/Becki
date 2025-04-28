import { EditedChpaterDto } from '../dto/editedChapter.dto';
import { EditedChapterListPagination, EditedChapterListQuery } from '../dto/editedChapterList';
import { MutateChapterDto } from '../dto/mutateChapter.dto';

export interface EditChapterRepositoryInterface {
    getEditedChapter: (chapterId: number) => Promise<EditedChpaterDto>;
    getEditedChapterList: (
        mangaId: number,
        query: EditedChapterListQuery,
    ) => Promise<EditedChapterListPagination>;
    createChapter: (mangaId: number, data: MutateChapterDto) => Promise<EditedChpaterDto>;
    updateChapter: (chapterId: number, data: MutateChapterDto) => Promise<EditedChpaterDto>;
    deleteChapter: (chapterId: number) => Promise<void>;
}
