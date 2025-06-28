import { EditedBookCover } from '../dto/editedBookCovers.dto';

export interface EditBookCoversServiceInterface {
    getMangaCovers: (id: number) => Promise<EditedBookCover[]>;
    addMangaCovers: (bookId: number, covers: Express.Multer.File[]) => Promise<EditedBookCover[]>;
    deleteMangaCovers: (coversId: number[]) => Promise<EditedBookCover[]>;
}
