import { EditedBookCoverList } from '../dto/editedBookCovers.dto';

export interface EditBookCoversServiceInterface {
    getEditedCovers: (id: number) => Promise<EditedBookCoverList>;
    addCovers: (bookId: number, covers: Express.Multer.File[]) => Promise<void>;
    setMainCover: (bookId: number, coverId: number) => Promise<void>;
    deleteCovers: (bookId: number, coversId: number[]) => Promise<void>;
}
