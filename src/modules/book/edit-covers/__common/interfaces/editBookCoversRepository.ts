import { EditedBookCover } from '../dto/editedBookCovers.dto';

export interface EditBookCoversRepositoryInterface {
    getEditedCovers: (bookId: number) => Promise<EditedBookCover[]>;
    addCovers: (bookId: number, covers: string[]) => Promise<void>;
    setMainCover: (bookId: number, coverId: number) => Promise<void>;
    deleteCovers: (bookId: number, coversId: number[]) => Promise<string[]>;
}
