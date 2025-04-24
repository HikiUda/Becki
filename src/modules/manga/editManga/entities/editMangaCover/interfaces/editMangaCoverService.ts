import { EditedMangaCover } from '../dto/editedMangaCover.dto';

export interface EditMangaCoverServiceInterface {
    getMangaCovers: (id: number) => Promise<EditedMangaCover[]>;
    addMangaCovers: (mangaId: number, covers: Express.Multer.File[]) => Promise<EditedMangaCover[]>;
    deleteMangaCovers: (coversId: number[]) => Promise<EditedMangaCover[]>;
}
