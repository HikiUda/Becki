import { EditedMangaCoverResponseArrayData } from '../dto/editedMangaCover.dto';
import { MangaFilesUploadType } from '../../../types/fileUpload';
import { DeleleMangaCoversDto } from '../dto/deleteMangaCoversDto';

export interface EditMangaCoverControllerInterface {
    getMangaCovers: (mangaId: number) => Promise<EditedMangaCoverResponseArrayData>;
    addMangaCovers: (
        id: number,
        files: Omit<MangaFilesUploadType, 'banner'>,
    ) => Promise<EditedMangaCoverResponseArrayData>;
    deleteMangaCovers: (body: DeleleMangaCoversDto) => Promise<void>;
}
