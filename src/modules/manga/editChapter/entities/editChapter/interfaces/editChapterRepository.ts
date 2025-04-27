import { EditedChpaterDto } from '../dto/editedChapter.dto';
import { MutateChapterDto } from '../dto/mutateChapter.dto';

export interface EditChapterRepositoryInterface {
    getEditedChapter: (chapterId: number) => Promise<EditedChpaterDto>;
    createChapter: (mangaId: number, data: MutateChapterDto) => Promise<EditedChpaterDto>;
    updateChapter: (chapterId: number, data: MutateChapterDto) => Promise<EditedChpaterDto>;
    deleteChapter: (chapterId: number) => Promise<void>;
}
