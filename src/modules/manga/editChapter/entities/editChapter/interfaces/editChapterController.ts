import { GetMangaChapterIdDto } from '../../../dto/getMangaChapterId.dto';
import { EditedChpaterDto } from '../dto/editedChapter.dto';
import { EditedChapterListPagination, EditedChapterListQuery } from '../dto/editedChapterList';
import { MutateChapterDto } from '../dto/mutateChapter.dto';

export interface EditChapterControllerInterface {
    getEditedChapter: (ids: GetMangaChapterIdDto) => Promise<EditedChpaterDto>;
    getEditedChapterList: (
        mangaId: number,
        query: EditedChapterListQuery,
    ) => Promise<EditedChapterListPagination>;
    createChapter: (mangaId: number, data: MutateChapterDto) => Promise<EditedChpaterDto>;
    updateChapter: (ids: GetMangaChapterIdDto, data: MutateChapterDto) => Promise<EditedChpaterDto>;
    deleteChapter: (ids: GetMangaChapterIdDto) => Promise<void>;
}
